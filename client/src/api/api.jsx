import axios from 'axios';
import Auth from "./../services/auth";

class Api {
  /**
   * ============================== [Login & Auth] ==============================
   */
  // Login
  login = async (credentials) => {
    try {
      credentials['ip'] = await this.getIP();
      let response = await axios.post(Auth.getURL()+`auth/user`, credentials);
      if (response.status === 200 && response.data.auth != null) {
        return await response.data.auth;
      } else {
        // NETWORK CONNTION ISSUE
        throw new Error(response.status);
        return await Promise.reject(response);
      }
    } catch(err) {
      return await Promise.reject(err);
    }
  }

  // Send Forgot Password
  sendForgot = async (forgot) => {
    try {
      forgot['ip'] = await this.getIP();
      let response = await axios.post(Auth.getURL()+`auth/send`, forgot);
      if (response.status === 200 && response.data.auth !== null) {
        // RETURN true -> Email Send; false -> Email Send Issue; null -> Email Not Found
        return await response.data.auth;
      } else {
        // NETWORK CONNTION ISSUE
        return await Promise.reject(response);
        throw new Error(response.status);
      }
    } catch(err) {
      return await Promise.reject(err);
    }
  }

  // User Register
  register = async (data) => {
    try {
      let date = new Date();
      data['createdate'] = date.getTime();
      data['ip'] = await this.getIP();
      let response = await axios.post(Auth.getURL()+`regi/user`, data);
      if (response.status === 200) {
        if (response.data.auth !== null) {
          return await response.data.auth;
        } else {
          // INTERNAL DATABASE / SERVER CONNTACTION ISSUE
          return await Promise.reject(response.data.err || "Internal Server or Database Connection Issue");
        }
      } else {
        // NETWORK CONNTION ISSUE
        return await Promise.reject(response);
        throw new Error(response.status);
      }
    } catch(err) {
      return await Promise.reject(err);
    }
  }

  // User Register - Check Email
  checkEmail = async (data) => {
    try {
      let response = await axios.post(Auth.getURL()+`auth/email`, data);
      // RETURN true -> Passed Check; false -> Failed Check (Existed); null -> Error During Checking
      if (response.status === 200) {
        if (response.data.auth !== null) {
          return await response.data.auth;
        } else {
          // INTERNAL DATABASE / SERVER CONNTACTION ISSUE
          return await Promise.reject(response.data.err || "Internal Server or Database Connection Issue");
        }
      } else {
        // NETWORK CONNTION ISSUE
        return await Promise.reject(response);
        throw new Error(response.status);
      }
    } catch(err) {
      return await Promise.reject(err);
    }
  }



  /**
   * ============================== [ LOG ] ==============================
   */
  // GET A LIST OF LOGS
  getLogs = async () => {
    try {
      let response = await axios.get(Auth.getURL()+`api/logs`, Auth.getAuthHeader());
      if (response.status === 200) {
        return await (response.data.err === null) ? response.data.data : Promise.reject(response.data.err || "Internal Server or Database Connection Issue");
      } else {
        // NETWORK CONNTION ISSUE
        console.log(" ****** getLogs response", response);
        return await Promise.reject(response);
        throw new Error(response.status);
      }
    } catch(err) {
      console.log(" ****** getLogs err", err);
      return await Promise.reject((err.toString().indexOf('401') >= 0) ? "Unauthorized" : err);
    }
  }



  /**
   * ============================== [ USER ] ==============================
   */
  // GET A LIST OF USERS
  getUsers = async () => {
    try {
      let responses = await Promise.all([
        axios.get(Auth.getURL()+`api/users`, Auth.getAuthHeader()),
        axios.get(Auth.getURL()+`api/deleted/users`, Auth.getAuthHeader())
      ]);
      if (responses[0].status === 200 && responses[1].status === 200) {
        if (responses[0].data.err === null && responses[1].data.err === null) {
          return await {users: responses[0].data.data, deletedUsers: responses[1].data.data};
        } else {
          // INTERNAL DATABASE / SERVER CONNTACTION ISSUE
          return await Promise.reject(responses[0].data.err || responses[1].data.err || "Internal Server or Database Connection Issue");
        }
      } else {
        // NETWORK CONNTION ISSUE
        return await Promise.reject(responses);
        throw new Error(responses);
      }
    } catch(err) {
      return await Promise.reject((err.toString().indexOf('401') >= 0) ? "Unauthorized" : err);
    }
  }

  // GET INDIVIDUAL USER BY ID
  getUser = async (id) => {
    try {
      let response = await axios.get(Auth.getURL()+`api/user/${id}`, Auth.getAuthHeader());
      if (response.status === 200) {
        return await (response.data.err === null) ? response.data.data : Promise.reject(response.data.err || "Internal Server or Database Connection Issue");
      } else {
        // NETWORK CONNTION ISSUE
        return await Promise.reject(response);
        throw new Error(response.status);
      }
    } catch(err) {
      return await Promise.reject((err.toString().indexOf('401') >= 0) ? "Unauthorized" : err);
    }
  }

  // UPDATE USER BY ID
  updateUser = async (data) => {
    try {
      let date = new Date();
      data['modifydate'] = date.getTime();
      let profile = Auth.checkToken();
      data['modifyby'] = profile.email;
      let response = await axios.put(Auth.getURL()+`api/user/${data.id}`, data, Auth.getAuthHeader());
      if (response.status === 200) {
        return await (response.data.err === null) ? response.data.data : Promise.reject(response.data.err || "Internal Server or Database Connection Issue");
      } else {
        // NETWORK CONNTION ISSUE
        return await Promise.reject(response);
        throw new Error(response.status);
      }
    } catch(err) {
      return await Promise.reject((err.toString().indexOf('401') >= 0) ? "Unauthorized" : err);
    }
  }

  // DELETE INDIVIDUAL USER BY ID
  deleteUser = async (id) => {
    try {
      let body = Auth.getAuthHeader();
      body['data'] = { deleteby: Auth.checkToken().email };
      let response = await axios.delete(Auth.getURL()+`api/user/${id}`, body);
      if (response.status === 200) {
        return await (response.data.err === null) ? response.data.data : Promise.reject(response.data.err || "Internal Server or Database Connection Issue");
      } else {
        // NETWORK CONNTION ISSUE
        return await Promise.reject(response);
        throw new Error(response.status);
      }
    } catch(err) {
      return await Promise.reject((err.toString().indexOf('401') >= 0) ? "Unauthorized" : err);
    }
  }



  /**
   * ============================== [ EXPENSE ] ==============================
   */
  // GET A LIST OF EXPENSES
  getExpenses = async () => {
    try {
      let response = await axios.get(Auth.getURL()+`api/expenses`, Auth.getAuthHeader());
      if (response.status === 200) {
        return await (response.data.err === null) ? response.data.data : Promise.reject(response.data.err || "Internal Server or Database Connection Issue");
      } else {
        // NETWORK CONNTION ISSUE
        return await Promise.reject(response);
        throw new Error(response.status);
      }
    } catch(err) {
      return await Promise.reject((err.toString().indexOf('401') >= 0) ? "Unauthorized" : err);
    }
  }

  // GET INDIVIDUAL EXPENSE BY ID
  getExpense = async (id) => {
    try {
      let response = await axios.get(Auth.getURL()+`api/expense/${id}`, Auth.getAuthHeader());
      if (response.status === 200) {
        return await (response.data.err === null) ? response.data.data : Promise.reject(response.data.err || "Internal Server or Database Connection Issue");
      } else {
        // NETWORK CONNTION ISSUE
        return await Promise.reject(response);
        throw new Error(response.status);
      }
    } catch(err) {
      return await Promise.reject((err.toString().indexOf('401') >= 0) ? "Unauthorized" : err);
    }
  }

  // CREATE SINGLE EXPENSE
  createExpense = async (data) => {
    try {
      let profile = Auth.checkToken();
      data['username'] = profile.email;
      let response = await axios.post(Auth.getURL()+`api/expense`, data, Auth.getAuthHeader());
      if (response.status === 200) {
        return await (response.data) ? response.data.data : Promise.reject(response.data.err || "Internal Server or Database Connection Issue");
      } else {
        // NETWORK CONNTION ISSUE
        return await Promise.reject(response);
        throw new Error(response.status);
      }
    } catch(err) {
      return await Promise.reject(err);
    }
  }

  // UPDATE EXPENSE BY ID
  updateExpense = async (data) => {
    try {
      let profile = Auth.checkToken();
      data['username'] = profile.email;
      let response = await axios.put(Auth.getURL()+`api/expense/${data.id}`, data, Auth.getAuthHeader());
      if (response.status === 200) {
        return await (response.data.err === null) ? response.data.data : Promise.reject(response.data.err || "Internal Server or Database Connection Issue");
      } else {
        // NETWORK CONNTION ISSUE
        return await Promise.reject(response);
        throw new Error(response.status);
      }
    } catch(err) {
      return await Promise.reject((err.toString().indexOf('401') >= 0) ? "Unauthorized" : err);
    }
  }

  // DELETE INDIVIDUAL EXPENSE BY ID
  deleteExpense = async (id) => {
    try {
      let response = await axios.delete(Auth.getURL()+`api/expense/${id}`, Auth.getAuthHeader());
      if (response.status === 200) {
        return await (response.data.err === null) ? response.data.data : Promise.reject(response.data.err || "Internal Server or Database Connection Issue");
      } else {
        // NETWORK CONNTION ISSUE
        return await Promise.reject(response);
        throw new Error(response.status);
      }
    } catch(err) {
      return await Promise.reject((err.toString().indexOf('401') >= 0) ? "Unauthorized" : err);
    }
  }

  // BACKUP ALL EXPENSES
  backupExpense = async () => {
    try {
      var data = {
        datetime : (new Date()).getTime()
      };
      let response = await axios.post(Auth.getURL()+`api/expensebackup`, data, Auth.getAuthHeader());
      if (response.status === 200) {
        return await (response.data) ? response.data.data : Promise.reject(response.data.err || "Internal Server or Database Connection Issue");
      } else {
        // NETWORK CONNTION ISSUE
        return await Promise.reject(response);
        throw new Error(response.status);
      }
    } catch(err) {
      return await Promise.reject((err.toString().indexOf('401') >= 0) ? "Unauthorized" : err);
    }
  }



  /**
   * ============================== [ FLIGHT ] ==============================
   */
  // GET TOKEN BY WEBSITE ID
  getWebsiteToken = async (id) => {
    try {
      let response = await axios.get(Auth.getURL()+`api/website/${id}`, Auth.getAuthHeader());
      if (response.status === 200) {
        return await (response.data.err === null) ? response.data.data : Promise.reject(response.data.err || "Internal Server or Database Connection Issue");
      } else {
        // NETWORK CONNTION ISSUE
        return await Promise.reject(response);
        throw new Error(response.status);
      }
    } catch(err) {
      return await Promise.reject((err.toString().indexOf('401') >= 0) ? "Unauthorized" : err);
    }
  }

  // UPDATE TOKEN BY WEBSITE ID
  updateWebsiteToken = async (data) => {
    try {
      let response = await axios.put(Auth.getURL()+`api/website/${data.websiteid}`, data, Auth.getAuthHeader());
      if (response.status === 200) {
        return await (response.data.err === null) ? response.data.data : Promise.reject(response.data.err || "Internal Server or Database Connection Issue");
      } else {
        // NETWORK CONNTION ISSUE
        return await Promise.reject(response);
        throw new Error(response.status);
      }
    } catch(err) {
      return await Promise.reject((err.toString().indexOf('401') >= 0) ? "Unauthorized" : err);
    }
  }

  // GET A LIST OF TRACKS
  getTracks = async () => {
    try {
      let response = await axios.get(Auth.getURL()+`api/tracks`, Auth.getAuthHeader());
      if (response.status === 200) {
        return await (response.data.err === null) ? response.data.data : Promise.reject(response.data.err || "Internal Server or Database Connection Issue");
      } else {
        // NETWORK CONNTION ISSUE
        return await Promise.reject(response);
        throw new Error(response.status);
      }
    } catch(err) {
      return await Promise.reject((err.toString().indexOf('401') >= 0) ? "Unauthorized" : err);
    }
  }

  // GET ONE TRACK BY ID
  getTrack = async (id) => {
    try {
      let response = await axios.get(Auth.getURL()+`api/track/${id}`, Auth.getAuthHeader());
      if (response.status === 200) {
        return await (response.data.err === null) ? response.data.data : Promise.reject(response.data.err || "Internal Server or Database Connection Issue");
      } else {
        // NETWORK CONNTION ISSUE
        return await Promise.reject(response);
        throw new Error(response.status);
      }
    } catch(err) {
      return await Promise.reject((err.toString().indexOf('401') >= 0) ? "Unauthorized" : err);
    }
  }

  // GET FLIGHTS BY TRACK ID
  getFlight = async (id) => {
    try {
      let response = await axios.get(Auth.getURL()+`api/flight/${id}`, Auth.getAuthHeader());
      if (response.status === 200) {
        return await (response.data.err === null) ? response.data.data : Promise.reject(response.data.err || "Internal Server or Database Connection Issue");
      } else {
        // NETWORK CONNTION ISSUE
        return await Promise.reject(response);
        throw new Error(response.status);
      }
    } catch(err) {
      return await Promise.reject((err.toString().indexOf('401') >= 0) ? "Unauthorized" : err);
    }
  }

  // GET (SEARCH) TICKETS FOR FLIGHT
  getTickets = async (token) => {
    try {
      let response = await axios.post(Auth.getURL()+`api/ticket/search`, token, Auth.getAuthHeader());
      if (response.status === 200) {
        return await (response.data.err === null) ? response.data.data : Promise.reject(response.data.err || "Internal Server or Database Connection Issue");
      } else {
        // NETWORK CONNTION ISSUE
        return await Promise.reject(response);
        throw new Error(response.status);
      }
    } catch(err) {
      return await Promise.reject((err.toString().indexOf('401') >= 0) ? "Unauthorized" : err);
    }
  }



  /**
   * ============================== [ PROPERTY ] ==============================
   */
  // GET A LIST OF PROPERTIES
  getProperties = async () => {
    try {
      let response = await axios.get(Auth.getURL()+`api/properties`, Auth.getAuthHeader());
      if (response.status === 200) {
        return await (response.data.err === null) ? response.data.data : Promise.reject(response.data.err || "Internal Server or Database Connection Issue");
      } else {
        // NETWORK CONNTION ISSUE
        return await Promise.reject(response);
        throw new Error(response.status);
      }
    } catch(err) {
      return await Promise.reject((err.toString().indexOf('401') >= 0) ? "Unauthorized" : err);
    }
  }

  // RUN CRON JOB TO IMPORT PROPERTIES
  importProperty = async () => {
    try {
      let { headers } = Auth.getAuthHeader();
      let response = await axios.post(Auth.getURL()+`auth/cron`, { headers });
      if (response.status === 200) {
        return await (response.data) ? response.data.data : Promise.reject(response.data.err || "Internal Server or Database Connection Issue");
      } else {
        // NETWORK CONNTION ISSUE
        return await Promise.reject(response);
        throw new Error(response.status);
      }
    } catch(err) {
      return await Promise.reject((err.toString().indexOf('401') >= 0) ? "Unauthorized" : err);
    }
  }

  // DELETE MULTIPLE PROPERTIES BY ARRAY
  deletePropertyArray = async (id) => {
    try {
      let { headers } = Auth.getAuthHeader();
      let response = await axios.delete(Auth.getURL()+`api/properties`, { headers: headers, data: { id } });
      if (response.status === 200) {
        return await (response.data) ? response.data.data : Promise.reject(response.data.err || "Internal Server or Database Connection Issue");
      } else {
        // NETWORK CONNTION ISSUE
        return await Promise.reject(response);
        throw new Error(response.status);
      }
    } catch(err) {
      return await Promise.reject((err.toString().indexOf('401') >= 0) ? "Unauthorized" : err);
    }
  }

  // GET INDIVIDUAL PROPERTY BY ID
  getProperty = async (id) => {
    try {
      let response = await axios.get(Auth.getURL()+`api/property/${id}`, Auth.getAuthHeader());
      if (response.status === 200) {
        return await (response.data.err === null) ? response.data.data : Promise.reject(response.data.err || "Internal Server or Database Connection Issue");
      } else {
        // NETWORK CONNTION ISSUE
        return await Promise.reject(response);
        throw new Error(response.status);
      }
    } catch(err) {
      return await Promise.reject((err.toString().indexOf('401') >= 0) ? "Unauthorized" : err);
    }
  }

  // UPDATE INDIVIDUAL PROPERTY BY ARRAY
  updateProperty = async (data) => {
    try {
      let response = await axios.put(Auth.getURL()+`api/property/${data.id}`, data, Auth.getAuthHeader());
      if (response.status === 200) {
        return await (response.data.err === null) ? response.data.data : Promise.reject(response.data.err || "Internal Server or Database Connection Issue");
      } else {
        // NETWORK CONNTION ISSUE
        return await Promise.reject(response);
        throw new Error(response.status);
      }
    } catch(err) {
      return await Promise.reject((err.toString().indexOf('401') >= 0) ? "Unauthorized" : err);
    }
  }



  /**
   * ============================== [ VISA ] ==============================
   */
  // GET A LIST OF VISAS
  getVisas = async () => {
    try {
      let response = await axios.get(Auth.getURL()+`api/visas`, Auth.getAuthHeader());
      if (response.status === 200) {
        return await (response.data.err === null) ? response.data.data : Promise.reject(response.data.err || "Internal Server or Database Connection Issue");
      } else {
        // NETWORK CONNTION ISSUE
        return await Promise.reject(response);
        throw new Error(response.status);
      }
    } catch(err) {
      return await Promise.reject((err.toString().indexOf('401') >= 0) ? "Unauthorized" : err);
    }
  }



  /**
   * ============================== [ IP ] ==============================
   */
  // GET IP
  getIP = async () => {
    try {
      let data = {
        dataType: 'json',
        headers: {
          "Content-Type": "application/json"
        }
      };
      let res = await axios.get("https://ipinfo.io?token=706e88886bcde1", data);
      //console.log(" ****** getIP res", JSON.stringify(res));
      return await res.data;
    } catch(err) {
      return await Promise.reject(err);
    }
  }


  getAccessTokenFromCode = async (code) => {
    const { data } = await axios({
      url: `https://oauth2.googleapis.com/token`,
      method: 'post',
      data: {
        client_id: '15281320220-vge2uvg01ntamot0hpudn246br296ube.apps.googleusercontent.com',
        client_secret: 'xJoS-xeaRMxHMi2pjYiMFAiO',
        redirect_uri: 'http://localhost:3000/auth/google',
        grant_type: 'authorization_code',
        code,
      },
    });
    console.log(" ===== getAccessTokenFromCode ===== ", data); // { access_token, expires_in, token_type, refresh_token }
    return data.access_token;
  }



  getGoogleDriveFiles = async (access_token) => {
    console.log(" ===== access_token ===== ", access_token);

    let response = await axios.get(`https://www.googleapis.com/oauth2/v2/userinfo`, {headers: {Authorization: 'Bearer ' + access_token }});

    // const { data } = await axios({
    //   url: 'https://www.googleapis.com/oauth2/v2/userinfo',
    //   method: 'get',
    //   headers: {
    //     Authorization: `Bearer ${access_token}`,
    //   },
    // });
    console.log(" ===== getGoogleDriveFiles ===== ", response); // { id, email, given_name, family_name }
    return response;
  }


  addUsername = async (data) => {
    try {
      let response = await axios.post(`/api/users`, data);

      console.log(" ===== response ===== ", response);
      if (response.status === 200) {
        return await (response.data) ? response.data.data : Promise.reject(response.data.err || "Internal Server or Database Connection Issue");
      } else {
        // NETWORK CONNTION ISSUE
        return await Promise.reject(response);
        throw new Error(response.status);
      }
    } catch(err) {
      return await Promise.reject(err);
    }
  }

  getAuthGoogle = async () => {
    try {
      var data = {
        datetime : (new Date()).getTime()
      };
      let response = await axios.get(Auth.getURL()+`auth/google`, Auth.getAuthHeader());
      if (response.status === 200) {
        console.log("response.data",response.data);
        return await (response.data) ? response.data.data : Promise.reject(response.data.err || "Internal Server or Database Connection Issue");
      } else {
        // NETWORK CONNTION ISSUE
        return await Promise.reject(response);
        throw new Error(response.status);
      }
    } catch(err) {
      return await Promise.reject((err.toString().indexOf('401') >= 0) ? "Unauthorized" : err);
    }
  }

}

export default new Api();
