import BankBasicinfo from '@/components/bank/BankBasicInfo';

export default function BankAccount() {
  return (
    <div className="mx-24">
      <BankBasicinfo isButton={true} />
      <div>
        <label className="form-control w-full max-w-xs">
          <div className="label"></div>
          <input
            type="text"
            placeholder="Type here"
            className="input input-bordered w-full max-w-xs rounded-xl border-2 border-solid border-gray-300"
          />
          <div className="label">
            <span className="label-text-alt text-gray-500">
              연월일 8자리 입력 예)20210501
            </span>
          </div>
        </label>
      </div>
    </div>
  );
}
