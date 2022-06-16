import React, { useState , useEffect } from "react";
import "../../src/style/signup.scss";

export default function Signup() {
  // Declare a new state variables
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [nationalId, setNationalId] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [nationalIdError, setNationalIdError] = useState("");

  // useEffect(() => {
  //   const timer = setTimeout((errorMsg) => {
  //     errorMsg
  //   }, 1000);
  //   return () => clearTimeout(timer);
  // }, []);

  //handlers:
  const handleFirstName = (e) => {
    setFirstName(e.target.value);
  };

  const handleLastName = (e) => {
    setLastName(e.target.value);
  };

  const handleMobileNumber = (e) => {
    setMobileNumber(e.target.value);
  };

  const handleNationalId = (e) => {
    setNationalId(e.target.value);
  };

  //catch error
  const formValidation = (e) => {
    if (!firstName) {
      setFirstNameError("مقدار نام نباید خالی باشد");
    } else {
      setFirstNameError("");
    }

    if (!lastName) {
      setLastNameError("مقدار نام‌خانوادگی نباید خالی باشد");
    } else {
      setLastNameError("");
    }

    e.preventDefault();
    // Convert Arabic/Persian numbers to English
    const changeNumber = (s) =>
      s.replace(/[۰-۹]/g, (d) => "۰۱۲۳۴۵۶۷۸۹".indexOf(d));
    const phoneNumber = changeNumber(mobileNumber);
    if (!phoneNumber) {
      setPhoneError("شماره همراه نباید خالی باشد");
    } else if (phoneNumber.length !== 11) {
      setPhoneError("شماره همراه باید ۱۱ رقم باشد");
    } else if (phoneNumber && phoneNumber.length === 11) {
      return phoneNumber;
    } 

    const nationalIdVal = changeNumber(nationalId);
    if (!nationalIdVal) {
      setNationalIdError("کد ملی نباید خالی باشد");
    } else if (nationalIdVal.length !== 10) {
      setNationalIdError("کد ملی باید ۱۱ رقم باشد");
    }
  };

  return (
    <div className="backGround">
      <form
        onSubmit={formValidation}
        className="col-12 text-center d-inline-block"
      >
        <fieldset>
          <div className="row">
            نام
            <input
              className="col-sm-12 nationalId-input mt-2"
              placeholder="نام"
              // ref={inputContainer}
              onChange={handleFirstName}
              value={firstName}
              // required
            />
          </div>
          <div className="row">
            <input
              className="col-sm-12 nationalId-input mt-2"
              placeholder="نام‌خانوادگی"
              // ref={inputContainer}
              onChange={handleLastName}
              value={lastName}
              // required
            />
          </div>
          <div className="row">
            <input
              className="col-sm-12 nationalId-input mt-2 m-"
              placeholder="شماره موبایل"
              // ref={inputContainer}
              onChange={handleMobileNumber}
              value={mobileNumber}
            />
          </div>
          <div className="row">
            <input
              className="col-sm-12 nationalId-input mt-2"
              placeholder="کد ملی"
              // ref={inputContainer}
              onChange={handleNationalId}
              value={nationalId}
            />
          </div>
          <div>
            {firstNameError && (
              <span className="position-static AlertText">
                {firstNameError}
              </span>
            )}
          </div>
          <div>
            {lastNameError && (
              <span className="position-static AlertText">{lastNameError}</span>
            )}
          </div>
          <div>
            {phoneError && (
              <span className="position-static AlertText">{phoneError}</span>
            )}
          </div>
          <div>
            {nationalIdError && (
              <span className="position-static AlertText">{nationalIdError}</span>
            )}
          </div>
          <div className="text-center mt-4">
            <button type="submit" className="btn-submit px-5">
              ثبت
            </button>
          </div>
        </fieldset>
      </form>
    </div>
  );
}
