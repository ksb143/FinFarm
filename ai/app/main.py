from fastapi import FastAPI, HTTPException
import openai
import pymysql
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    openai_api_key: str
    ai_model_name : str
    db_url : str
    db_port : int
    db_user : str
    db_password : str
    db_name : str

    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"

settings = Settings()
app = FastAPI()

# Database connection 설정
conn = pymysql.connect(host= settings.db_url, port=settings.db_port, user=settings.db_user, password=settings.db_password, db=settings.db_name, charset='utf8')

# OpenAI 클라이언트 초기화
client = openai.OpenAI(
    api_key= settings.openai_api_key
)

@app.get("/quiz")
async def generate_quiz():
    try:
        question_data = await make_question_with_retry(max_retries=5)
        return question_data
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

async def make_question_with_retry(max_retries: int) -> dict:
    retry_count = 0
    while retry_count < max_retries:
        try:
            gpt_response = make_question()

            response = {
                "question": gpt_response[0].split(' : ')[1],
                "answer": gpt_response[1].split(' : ')[1],
                "wrong": gpt_response[2].split(': ')[1].split('<sep>')
            }
            return response
        except Exception as e:
            print(f"Error: {e}, retrying... ({retry_count+1}/{max_retries})")
            retry_count += 1
    raise Exception("Failed to make a question after several retries.")

def make_question() -> str:
    messages = [{"role": "system", "content": "You are the best quiz generator."}]
    context = get_content()
    context += '<sep>generate question with context'
    message = {"role": "user", "content": context}
    messages.append(message)

    gpt_response = client.chat.completions.create(
        model=settings.ai_model_name,
        messages=messages,
        temperature=0.3,
        max_tokens=300
    )

    print(gpt_response)

    return gpt_response.choices[0].message.content.split(', ')
    

def get_content() -> str:
    cur = conn.cursor()
    cur.execute("SELECT context FROM quiz_context_tb ORDER BY RAND() LIMIT 1")
    return cur.fetchone()[0]
