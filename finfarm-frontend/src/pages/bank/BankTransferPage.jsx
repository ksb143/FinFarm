import BankBasicinfo from '@/components/bank/BankBasicInfo';

export default function BankTransferPage() {
  return (
    <div className="mx-24 flex flex-col gap-3">
      <div className="flex flex-col gap-10 rounded-xl border-2 border-solid border-gray-300 bg-white px-10 py-5">
        <BankBasicinfo isButton={false} />
        <label
          htmlFor="accountPassword"
          className="input input-bordered flex items-center gap-2 border-2 border-solid border-gray-300 bg-white"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4 opacity-70"
          >
            <path
              fillRule="evenodd"
              d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
              clipRule="evenodd"
            />
          </svg>
          <input
            id="accountPassword"
            type="password"
            className="grow"
            placeholder="계좌 비밀번호 4자리"
            maxLength={4}
            onKeyDown={(e) => {
              if (!/\d/.test(e.key)) {
                // 입력된 키가 숫자가 아닌 경우
                e.preventDefault(); // 입력 방지
              }
            }}
          />
        </label>
      </div>
    </div>
  );
}
