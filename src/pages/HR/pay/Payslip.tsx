import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useFindPayByPayIdQuery } from "../../../services/payApiSlice";

const TableHeader = ({
  leftTxt,
  rightTxt,
}: {
  leftTxt: string;
  rightTxt: string;
}) => {
  return (
    <div className="flex justify-between bg-gray-200 text-sm font-bold">
      <h2 className="px-2 py-1">{leftTxt}</h2>
      <h2 className="bg-gray-300 px-8">{rightTxt}</h2>
    </div>
  );
};

const TableRow = ({ text, amount }: { text: string; amount: any }) => {
  return (
    <div className="text-xs font-normal flex justify-between text-center px-2 py-1 border-b border-b-gray-300">
      <p>{text}</p>
      <p>{amount}</p>
    </div>
  );
};

function Payslip() {
  const { id } = useParams();
  const { data } = useFindPayByPayIdQuery(id);

  useEffect(() => {
    console.log("payId:", id, "payslip", data);
  }, [id]);

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white px-10 py-10 w-[850px]">
        {/* header */}
        <div className="flex justify-between">
          <h1 className="text-yellow-600 font-extrabold text-3xl">
            CREDOKS DIGITAL
          </h1>
          <h1 className="text-yellow-600 font-extrabold text-3xl">PAYSLIP</h1>
        </div>

        {/* company locations */}
        <div className="text-xs flex flex-col gap-1 py-2 text-yellow-900">
          <p>Addis Ababa, Ethiopia</p>
          <div className="flex gap-1">
            <p>phone: +251 963158999</p>
            <p>,</p>
            <p>email: company@company.com</p>
          </div>
        </div>

        {/* emp info and paydate and other info */}
        <div className="flex justify-between w-full py-2">
          {/* employee info */}
          <div>
            <div className="px-2 bg-yellow-500 text-white">
              <h5>EMPLOYEE INFORMATION</h5>
            </div>

            <div className="flex flex-col gap-1 text-xs py-2">
              <p className="text-sm uppercase font-semibold">
                {data?.employee?.firstName} {data?.employee?.fatherName}
              </p>
              <p>Addis Ababa, Ethiopia</p>
              <p>Phone: {data?.employee?.phone}</p>
              <p>Email: {data?.employee?.email}</p>
            </div>
          </div>
          {/* pay date */}
          <div className="flex justify-between gap-1 text-center">
            {/* block 1 */}
            <div>
              <div>
                <h5 className="bg-yellow-500 text-white px-2">Pay Date</h5>
                <p className="text-xs font-extrabold px-3 bg-gray-200 py-1">
                  {new Date(data?.payroll?.createdAt as Date)?.toDateString()}
                </p>
              </div>
              <div>
                <h5 className="bg-yellow-500 text-white px-2">PAYROLL #</h5>
                <p className="text-xs font-extrabold px-3 bg-gray-200 py-1">
                  {data?.payroll?.id?.toString().slice(0, 15)}...
                </p>
              </div>
            </div>

            {/* block 2 */}
            <div>
              <div>
                <h5 className="bg-yellow-500 text-white px-2">Period</h5>
                <p className="text-xs font-extrabold px-3 bg-gray-200 py-1">
                  {
                    new Date(data?.payroll?.createdAt as Date)
                      ?.toDateString()
                      .split(" ")[1]
                  }{" "}
                  {
                    new Date(data?.payroll?.createdAt as Date)
                      ?.toDateString()
                      .split(" ")[3]
                  }
                </p>
              </div>
              <div>
                <h5 className="bg-yellow-500 text-white px-2">Tax Code</h5>
                <p className="text-xs font-extrabold px-3 bg-gray-200 py-1">
                  12345 #null-value
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Earning Amt table */}
        <div className="py-2">
          <div>
            {/* table head */}
            <TableHeader leftTxt={"Earning"} rightTxt={"Amount (in Birr)"} />

            {/* table row */}
            <div className="text-xs font-normal flex justify-between text-center px-2 py-1 border-b border-b-gray-300">
              <p>Basic Salary</p>
              <p>{data?.employee?.salary ?? "-"}</p>
            </div>

            {/* table row 2 */}
            <div className="text-xs font-normal flex justify-between text-center px-2 py-1 border-b border-b-gray-300">
              <p>Repres. Allowance</p>
              <p>-</p>
            </div>

            {/* table row 2 */}
            <div className="text-xs font-normal flex justify-between text-center px-2 py-1 border-b border-b-gray-300">
              <p>None Taxable Allow.</p>
              <p>{"-"}</p>
            </div>

            {/* table row 2 */}
            <div className="text-xs font-normal flex justify-between text-center px-2 py-1 border-b border-b-gray-300">
              <p>Taxable Transp. Allow.</p>
              <p>-</p>
            </div>

            {/* table row 2 */}
            <div className="text-xs font-normal flex justify-between text-center px-2 py-1 border-b border-b-gray-300">
              <p>Telephone Allow.</p>
              <p>-</p>
            </div>

            {/* table row 2 */}
            <div className="text-xs font-normal flex justify-between text-center px-2 py-1 border-b border-b-gray-300">
              <p>Total O.T. Pay</p>
              <p>-</p>
            </div>

            {/* table Footer */}
            <div className="flex justify-end bg-gray-200 gap-12 text-sm font-bold py-1">
              <h2 className="px-2 text-base uppercase">Gross Pay: </h2>
              <h2 className="bg-gray-300 px-8">{data?.employee?.salary} Br.</h2>
            </div>
          </div>
        </div>

        {/* Deduction Amt */}
        <div className="py-2">
          <div>
            {/* table head */}
            <TableHeader leftTxt={"Deduction"} rightTxt={"Amount (in Birr)"} />

            <TableRow text={"deduction"} amount={data?.deduction ?? "-"} />
            <TableRow
              text={"Income Tax"}
              amount={data?.salaryIncomeTax ?? "-"}
            />
            <TableRow
              text={"Pension (7%)"}
              amount={Math.round(data?.employeePension * 1000) / 1000 ?? "-"}
            />

            {/* table Footer */}
            <div className="flex justify-end bg-gray-200 gap-12 text-sm font-bold py-1">
              <h2 className="px-2 text-base uppercase">Total Dedcution: </h2>
              <h2 className="bg-gray-300 px-8">
                {(data?.deduction ?? 0) +
                  (data?.salaryIncomeTax ?? 0) +
                  Math.round((data?.employeePension ?? 0) * 1000) / 1000}
              </h2>
            </div>
          </div>
        </div>

        {/* Net Payment */}
        <div className="flex justify-end py-8 font-bold">
          <div className="flex justify-end gap-36 bg-gray-300 px-2 py-1 border-b-2 border-t-2 border-gray-400">
            <p className="uppercase font-bold">Net Pay: </p>
            <p>{data?.netPay ?? "-"} Br.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payslip;
