using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;


    public class Agent
    {
        public int Id { get; set; }
        public string Name{ get ; set;}
        public string Surname{ get ; set;}
        public string Address{ get ; set;}
        public string EmpNo{ get ; set;}

        public string Password{ get ; set;} 
        public string Email{ get ; set;}

        public Agent(){

        }
        public Agent(string name, string surname, string address, string empNo, string password, string email){
            Name  =  name;
            Surname = surname;
            Address = address;
            EmpNo = empNo;
            Password = password;
            Email = email;
        }
    }
