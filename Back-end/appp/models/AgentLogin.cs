using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;


    public class AgentLogin
    {
        public string Password{ get ; set;}
        public string Email{ get ; set;}
        public AgentLogin(){

        }

        public AgentLogin(string password, string email){
            Password = password;
            Email = email;
        }
    }