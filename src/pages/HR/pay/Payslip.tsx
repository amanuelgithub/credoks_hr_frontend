import { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { useFindPayByPayIdQuery } from "../../../services/payApiSlice";
import jsPDF from "jspdf";

const TableHeader = ({
  leftTxt,
  rightTxt,
}: {
  leftTxt: string;
  rightTxt: string;
}) => {
  return (
    <div className="flex justify-between bg-gray-200 text-[10px] font-bold">
      <h2 className="px-2 py-1">{leftTxt}</h2>
      <h2 className="bg-gray-300 px-8">{rightTxt}</h2>
    </div>
  );
};

const TableRow = ({ text, amount }: { text: string; amount: any }) => {
  return (
    <div className="font-normal flex justify-between text-center px-2 py-1 border-b border-b-gray-300">
      <p>{text}</p>
      <p>{amount}</p>
    </div>
  );
};

function Payslip() {
  const slipTemplate = useRef<any>(null);
  const { id } = useParams();
  const { data } = useFindPayByPayIdQuery(id);

  const handleGeneratePdf = () => {
    const doc = new jsPDF("p", "pt", "a4");

    doc.html(slipTemplate.current, {
      callback: function (pdf) {
        pdf.save("document");
      },
    });
  };

  useEffect(() => {
    console.log("payId:", id, "payslip", data);
  }, [id]);

  return (
    <>
      <div className="flex justify-center w-full">
        <button
          onClick={handleGeneratePdf}
          className="bg-indigo-600 text-white rounded-full px-4 m-2 py-1 font-bold shadow-lg"
        >
          Generate PDF
        </button>
        <button className="bg-indigo-600 text-white rounded-full px-4 m-2 py-1 font-bold shadow-lg">
          Print
        </button>
      </div>

      {/* This is where the slip starts */}
      <div className="flex justify-center items-start h-screen">
        <div ref={slipTemplate} className="bg-gray-100">
          <div className="bg-white px-10 py-10 w-[590px] h-[550px] text-[8px]">
            {/* header */}
            <div className="flex justify-between">
              <h1 className="text-yellow-600 font-extrabold text-xl">
                CREDOKS DIGITAL
              </h1>
              <h1 className="text-yellow-600 font-extrabold text-xl">
                PAYSLIP
              </h1>
            </div>

            {/* company locations */}
            <div className="text-[8px] flex flex-col gap-1 py-2 text-yellow-900">
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
                <h5 className="text-[10px] text-yellow-600">
                  EMPLOYEE INFORMATION
                </h5>

                <div className="flex flex-col gap-1 py-2">
                  <p className="text-[8px] uppercase font-semibold">
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
                    <h5 className="border border-gray-100 text-yellow-600 py-1 text-[10px]">
                      Pay Date
                    </h5>
                    <p className="text-xs font-extrabold px-3 border border-gray-100 py-1 text-[9px]">
                      {new Date(
                        data?.payroll?.createdAt as Date
                      )?.toDateString()}
                    </p>
                  </div>
                  <div>
                    <h5 className="border border-gray-100 text-yellow-600 py-1 text-[10px]">
                      PAYROLL #
                    </h5>
                    <p className="text-xs font-extrabold px-3 border border-gray-100 py-1 text-[9px]">
                      {data?.payroll?.id?.toString().slice(0, 15)}...
                    </p>
                  </div>
                </div>

                {/* block 2 */}
                <div>
                  <div>
                    <h5 className="border border-gray-100 text-yellow-600 py-1 text-[10px]">
                      Period
                    </h5>
                    <p className="text-xs font-extrabold px-3 border border-gray-100 py-1 text-[9px]">
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
                    <h5 className="border border-gray-100 text-yellow-600 py-1 text-[10px]">
                      Tax Code
                    </h5>
                    <p className="text-xs font-extrabold px-3 border border-gray-100 py-1 text-[9px]">
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
                <TableHeader
                  leftTxt={"Earning"}
                  rightTxt={"Amount (in Birr)"}
                />

                {/* table row */}
                <div className="font-normal flex justify-between text-center px-2 py-1 border-b border-b-gray-100">
                  <p>Basic Salary</p>
                  <p>{data?.employee?.salary ?? "-"}</p>
                </div>

                {/* table row 2 */}
                <div className="font-normal flex justify-between text-center px-2 py-1 border-b border-b-gray-100">
                  <p>Repres. Allowance</p>
                  <p>-</p>
                </div>

                {/* table row 2 */}
                <div className="font-normal flex justify-between text-center px-2 py-1 border-b border-b-gray-100">
                  <p>None Taxable Allow.</p>
                  <p>{"-"}</p>
                </div>

                {/* table row 2 */}
                <div className="font-normal flex justify-between text-center px-2 py-1 border-b border-b-gray-100">
                  <p>Taxable Transp. Allow.</p>
                  <p>-</p>
                </div>

                {/* table row 2 */}
                <div className="font-normal flex justify-between text-center px-2 py-1 border-b border-b-gray-100">
                  <p>Telephone Allow.</p>
                  <p>-</p>
                </div>

                {/* table row 2 */}
                <div className="font-normal flex justify-between text-center px-2 py-1 border-b border-b-gray-100">
                  <p>Total O.T. Pay</p>
                  <p>-</p>
                </div>

                {/* table Footer */}
                <div className="flex justify-end bg-gray-200 gap-12 text-[10px] font-bold py-1">
                  <h2 className="px-2 text-[10px] uppercase">Gross Pay: </h2>
                  <h2 className="bg-gray-300 px-8">
                    {data?.employee?.salary} Br.
                  </h2>
                </div>
              </div>
            </div>

            {/* Deduction Amt */}
            <div className="py-2">
              <div>
                {/* table head */}
                <TableHeader
                  leftTxt={"Deduction"}
                  rightTxt={"Amount (in Birr)"}
                />

                <TableRow text={"deduction"} amount={data?.deduction ?? "-"} />
                <TableRow
                  text={"Income Tax"}
                  amount={data?.salaryIncomeTax ?? "-"}
                />
                <TableRow
                  text={"Pension (7%)"}
                  amount={
                    Math.round(data?.employeePension * 1000) / 1000 ?? "-"
                  }
                />

                {/* table Footer */}
                <div className="flex justify-end bg-gray-200 gap-12  text-[10px] font-bold py-1">
                  <h2 className="px-2  text-[10px] uppercase">
                    Total Dedcution:{" "}
                  </h2>
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
      </div>
    </>
  );
}

export default Payslip;
