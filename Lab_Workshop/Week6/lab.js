const express = require("express");
const mongoose = require("mongoose");
const ejs = require("ejs");
const moment = require("moment");

const app = express();
const url = "mongodb://localhost:27017/FIT2095Lab6_DB";
const Doctors = require("./models/doctors");
const Patients = require("./models/patients");

mongoose.connect(url, function (err) {
    if (err) {
        console.log(err);
        return;
    }

    console.log("Successfully connected");
});

app.set("PORT", 5050);

app.engine("html", ejs.renderFile);
app.set("view engine", "html");

app.use(express.static('public/images'));
app.use(express.static("public/css"));

app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());

app.get("/", function (req, res) {
    res.render("index.html");
});

app.get("/addDoctor", function (req, res) {
    res.render("addDoctor.html");
});

app.post("/ADDDOCTOR", function (req, res) {
    console.log(req.body);

    let newDoctor = new Doctors({
        fullName: {
            firstName: req.body.firstName,
            lastName: req.body.lastName
        },
        dob: req.body.dob,
        address: {
            state: req.body.state,
            suburb: req.body.suburb,
            street: req.body.street,
            unit: req.body.unit
        },
        numPatients: req.body.numPatients
    });

    newDoctor.save(function (err) {
        if (err) {
            res.redirect("/data-invalid?err=" + err);
            return;
        }

        console.log("Saved successfully");
        res.redirect("/list-doctors");
    });
});

app.get("/addPatient", function (req, res) {
    res.render("addPatient.html");
});

app.post("/ADDPATIENT", function (req, res) {
    console.log(req.body);

    let newPatient = new Patients({
        fullName: req.body.fullName,
        doctor: mongoose.Types.ObjectId(req.body.doctor),
        age: req.body.age,
        visitDate: req.body.visitDate,
        caseDesc: req.body.caseDesc
    });

    newPatient.save(function (err) {
        if (err) {
            res.redirect("/data-invalid?err=" + err);
            return;
        }

        console.log("Saved successfully");
        Doctors.updateOne({
            '_id': mongoose.Types.ObjectId(req.body.doctor)
        }, {
            $inc: {
                "numPatients": 1
            }
        }, function (err, doc) {
            if (err) throw err;
        });
        res.redirect("/list-patients");
    });
});

app.get("/listDoctors", function (req, res) {
    Doctors.find({}, function (err, data) {
        if (err) {
            res.render("listDoctors.html");
        }
        res.render("listDoctors.html", {
            moment: moment,
            doctors: data
        });
    });
});

app.get("/listPatients", function (req, res) {
    Patients.find({}).populate("doctor").exec(function (err, data) {
        if (err) {
            throw err;
        }
        res.render("listPatients.html", {
            moment: moment,
            patients: data
        });
    });
});

app.get("/deletePatient", function (req, res) {
    res.render("deletePatient.html");
});

app.post("/DELETEPATIENT", function (req, res) {
    Patients.deleteOne(req.body, function (err) {
        if (err) throw err;

        res.redirect("/list-patients");
    });
});

app.get("/updateDoctor", function (req, res) {
    res.render("updateDoctor.html");
});

app.post("/doctor-updated", function (req, res) {
    if (req.body.numPatients >= 0) {
        let findID = {
            "_id": req.body._id
        };
        let setNumPatients = {
            $set: {
                "numPatients": req.body.numPatients
            }
        };
        Doctors.updateOne(findID, setNumPatients, function (err, doc) {
            if (err) throw err;
            res.redirect("/list-doctors");
        });
    } else {
        let err = "Number of patients cannot be negative";
        res.redirect("/data-invalid?err=" + err);
    }
});

app.get("/findDoctors", function (req, res) {
    res.render("findDoctors.html");
});

app.post("/doctors-found", function (req, res) {
    let num = req.body.numPatients;
    Doctors.where("numPatients").lt(num).exec(function (err, data) {
        if (err) {
            throw err;
        }
        res.render("listDoctors.html", {
            moment: moment,
            doctors: data
        });
    });
});

app.get("/data-invalid", function (req, res) {
    res.render("invalidData.html", {
        err: req.query["err"]
    });
});

app.listen(app.get("PORT"), function () {
    console.log(`We are listening http://localhost:${app.get("PORT")}`);
});