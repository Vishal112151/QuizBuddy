const express = require("express");
const router = express.Router();
const { pgConn } = require("../database/pgDBConn");
const bcrypt = require("bcrypt");
const saltRounds = 10;

router.get("/students", (req, res) => {
  return new Promise(async (resolve, reject) => {
    try {
      let result = await pgConn(`select * from students`);
      resolve(
        res.send({
          status: "Success",
          message: "List of all students",
          data: result.rows,
        })
      );
    } catch (error) {
      reject(
        res.send({
          status: "Failure",
          message: "getting Error",
          error: error.message,
        })
      );
    }
  });
});

router.post("/signup", async (req, res) => {
  return new Promise(async (resolve, reject) => {
    try {
      let { name, email, mobile,password } = req.body;
      console.log("req.body : ", name, email, mobile,password );
      let isstudentPresnt = await pgConn(
        `select * from students where email=$1 or mobile=$2`,
        [email, mobile]
      );
      //   console.log(isstudentPresnt);
      if (isstudentPresnt.rows.length > 0) {
        resolve(
          res.send({
            message: "student is already Registered ",
          })
        );
      } else {
        const hash = await bcrypt.hash(password, saltRounds)
          // Store hash in your password DB.
          console.log("hased password : ",hash);
      await pgConn(`insert into students ( name, email, mobile,password) values($1,$2,$3,$4)`, [
          name,
          email,
          mobile,
          hash,
        ]);
        
        resolve(
          res.send({
            status: "Success",
            message: "Signed Up Successfully",
          })
        );
      }
    } catch (error) {
      console.log("here", error);
      reject(
        res.send({
          status: "Failure",
          message: "unable to insert data in DB",
          error: error.message,
        })
      );
    }
  });
});

router.post("/login", (req, res) => {
  return new Promise(async (resolve, reject) => {
    try {
      let email = req.body.email;
      let mobile = req.body.mobile;
      let password = req.body.password;
      let isRegstudent;
      if (email != undefined) {
        console.log("trying to login through email");
        isRegstudent = await pgConn(`select * from students where email=$1`, [email]);
      } else if (mobile != undefined) {
        console.log("trying to login through mobile");
        isRegstudent = await pgConn(`select * from students where mobile=$1`, [
          mobile,
        ]);
      }
      if (isRegstudent.rows.length == 0) {
        reject(
          res.send({
            message: "student is not registered, First register Yourself !",
          })
        );
      } else {
        console.log(isRegstudent.rows);
        const isPasswordMatched = await bcrypt.compare(password, isRegstudent.rows[0].password);
        console.log("after comparing hash password with this password : ",isPasswordMatched);
        if (isPasswordMatched)
          resolve(res.send({ msg: "welcome to the dashboard" }));
        else {
          resolve(res.send({ message: "username or password is incorrect" }));
        }
      }
    } catch (error) {
      console.log("i am here in catch block");
    }
  });
});

module.exports = router;
