import React from "react";

export default function Terms({ terms }) {
  const { data } = terms;
  console.log(data);
  const { dosAndDonts, guaranteed, minimumPerson } = terms.data;

  const ages = data["age "].split("\n").filter((item) => item.trim() !== "");

  const dontsArray = dosAndDonts.donts
    .split("\n")
    .filter((item) => item.trim() !== "");

  const dosArray = dosAndDonts.dos
    .split("\n")
    .filter((item) => item.trim() !== "");

  const refundable = guaranteed.refundable
    .split("\n")
    .filter((item) => item.trim() !== "");

  const reschedule = guaranteed.reschedule
    .split("\n")
    .filter((item) => item.trim() !== "");

  return (
    <div className="font-['Poppins']">
      <h1 className=" text-xl font-bold">Terms and Condition</h1>
      <div>
        <h1 className="font-semibold mt-3 ">Age</h1>
        <ul className="list-disc pl-6 mt-2">
          {ages.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>
      <div>
        <h1 className="font-semibold mt-5">Minimum Person</h1>
        <ul>
          <li>{minimumPerson}</li>
        </ul>
      </div>
      <div>
        <h1 className="font-semibold mt-5 ">Dos and Don’ts</h1>
        <div>
          <h1 className="font-semibold mt-3 text-sm  ">Do’s</h1>
          <ul className="list-decimal pl-6 mt-2">
            {dosArray.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
        <div>
          <h1 className="font-semibold mt-3 text-sm">Don’ts</h1>
          <ul className="list-decimal pl-6 mt-2">
            {dontsArray.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
      <div>
        <h1 className="font-semibold mt-5 ">
          Refundable and Reschedule Detail
        </h1>
        <div>
          <h1 className="font-semibold mt-3 text-sm">Refundable</h1>
          <ul className="list-decimal pl-6 mt-2">
            {refundable.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
        <div>
          <h1 className="font-semibold mt-3 text-sm">Reschedule</h1>
          <ul className="list-decimal pl-6 mt-2">
            {reschedule.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
