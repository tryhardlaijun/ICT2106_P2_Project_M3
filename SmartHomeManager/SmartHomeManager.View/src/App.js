import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { NavBar } from "./components/NavBar";
import Home from "./pages/Home";
import Devices from "./pages/Devices";
import Profiles from "./pages/Profiles";
import Director from "./pages/Director";
import Backup from "./pages/Backup";
import Intruder from "./pages/Intruder";
import Configuration from "./pages/Configuration";
import EnergyProfile from "./pages/EnergyProfile";
import Scenario from "./pages/scenarios/Scenario";
import SchRule from "pages/rules/SchRule";
import ActionRule from "pages/rules/ActionRule";
import Rooms from "./pages/Rooms";
import { Container } from "@chakra-ui/react";
import Register from "./pages/account/Register";
import ForgetPassword from "./pages/account/ForgetPassword";
import Login from "./pages/account/Login";
import RegisterOK from "./pages/account/RegisterOK";
import MyAccount from "./pages/account/Setting";
import UserProfileEdit from "./pages/profile/EditProfile";
import ProfileLanding from "./pages/profile/ProfileLanding";
import RegisterDevice from "./pages/RegisterDevice";
import SelectNearbyDevice from "pages/SelectNearbyDevice";
import DeviceConfig from "./pages/DeviceConfig";
import Report from "pages/Analytics";
import Troubleshooter from "./pages/troubleshooter/Troubleshooter";
import CreateRuleDialogue from "pages/rules/CreateRuleDialogue";
import ApiRule from "pages/rules/ApiRule";

export function App() {
  return (
    <>
      <Router>
        <NavBar />
        <Container maxW={"6xl"} py={4}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/devices" element={<Devices />} />
            <Route path="/rooms" element={<Rooms />} />
            <Route path="/profiles" element={<Profiles />} />
            <Route path="/forgetpw" element={<ForgetPassword />} />
            <Route path="/login" element={<Login />} />
            <Route path="/myaccount" element={<MyAccount />} />
            <Route path="/account-created" element={<RegisterOK />} />
            <Route path="/edit-profile" element={<UserProfileEdit />} />
            <Route path="/profile-landing" element={<ProfileLanding />} />
            <Route path="/register" element={<Register />} />

            <Route path="/selectnearbydevice" element={<SelectNearbyDevice />} />
            <Route path="/registerdevice" element={<RegisterDevice />} />

            <Route path="/director" element={<Director />} />
            <Route path="/backup" element={<Backup />} />
            <Route path="/intruder" element={<Intruder />} />
            <Route path="/configuration" element={<Configuration />} />
            <Route path="/energyProfile" element={<EnergyProfile />} />
            <Route path="/scenario" element={<Scenario />} />
            <Route path="/troubleshooters" element={<Troubleshooter />} />
            <Route
              path="/scenario/create/action-rule"
              element={<ActionRule />}
            />
            {/* <Route
              path="/scenario/create/create-dialogue"
              element={<CreateRuleDialogue/>}
            /> */}
            <Route
              path="/scenario/create/schedule-rule"
              element={<SchRule />}
            />
            <Route
              path="/scenario/create/api-rule"
              element={<ApiRule />}
            />
            <Route
              path="/event/edit/:id"
              element={<ActionRule />}
            />
            <Route
              path="/schedule/edit/:id"
              element={<SchRule />}
            />
            <Route
              path="/api/edit/:id"
              element={<ApiRule />}
            />
            <Route path="/config" element={<DeviceConfig />} />
            <Route path="/analytics" element={<Report />} />
          </Routes>
        </Container>
      </Router>
    </>
  );
}
export default App;
