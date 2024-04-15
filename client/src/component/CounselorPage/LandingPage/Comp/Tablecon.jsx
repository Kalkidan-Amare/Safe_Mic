import React, { useState, useEffect } from "react";
import axios from "axios";
import API_URL from "@/url";
function Tablecon() {
  const [appos, setAppo] = useState([]);
  const [convertingIso, setConvertingIso] = useState(true);
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    getAppointment();
  }, []);

  const parseISOToDate = (isoString) => {
    return new Date(isoString);
  };

  const convertIso = () => {
    if (appos.length != 0 && convertingIso) {
      const currentDate = new Date();
      const updatedAppos = appos
        .map((appo) => ({
          ...appo,
          appointment_datetime: parseISOToDate(appo.appointment_datetime),
        }))
        .filter((appo) => {
          const appointmentDate = new Date(appo.appointment_datetime);
          return currentDate.toDateString() === appointmentDate.toDateString();
        });
      setAppo(updatedAppos);
      setConvertingIso(false);
    }
  };

  const convertToUserName = () => {
    if (appos.length != 0) {
      appos.forEach(async (appo) => {
        const username = await getUsername(appo.user);
        const newApoo = { ...appo, user: username };
        setAppointments((appos) => [...appos, newApoo]);
      });
    }
  };

  useEffect(() => {
    convertIso();
  }, [appos]);

  useEffect(() => {
    if (!convertingIso) {
      convertToUserName();
    }
  }, [convertingIso]);

  const getUsername = async (id) => {
    try {
      const username = await fetchUserName(id);
      return username;
    } catch (err) {
      console.log(err);
      return null;
    }
  };

  const fetchUserName = async (id) => {
    if (localStorage.getItem("access")) {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `JWT ${localStorage.getItem("access")}`,
          Accept: "application/json",
        },
      };

      try {
        const res = await axios.get(
          `${API_URL}/all/users/${id}`,
          config
        );
        return res.data.name;
      } catch (err) {
        console.log(err);
        throw err;
      }
    } else {
      console.log("invalid token");
    }
  };

  const getAppointment = async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${localStorage.getItem("access")}`,
        Accept: "application/json",
      },
    };

    try {
      const res = await axios.get(
        `${API_URL}/counselor/all-appointments/`,
        config
      );
      console.log(res);
      setAppo(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  console.log(appointments);
  return (
    <div className="relative overflow-x-auto sm:rounded-lg">
      {appointments.length != 0
        ? appointments.map((appo) => (
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th className="px-4 py-2">Time</th>
                  <th className="px-4 py-2">Appointement</th>
                </tr>
              </thead>
              <tbody>
                <tr key={appo.id}>
                  <td className="border px-4 py-2">
                    {new Date(appo.appointment_datetime).getHours() + ":00"}
                  </td>
                  <td className="border px-4 py-2">{appo.user}</td>
                </tr>
              </tbody>
            </table>
          ))
        : <div className="text-xl">You have No appointments today</div>}
    </div>
  );
}

export default Tablecon;
