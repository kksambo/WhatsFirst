using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;


    public class Dialer
    {
        public int Id { get; set; }
        public string PhoneNumber{ get ; set;}
        public string Name { get; set; }
        public string AssistingAgentName { get; set; }
        public string CallNotes { get; set; }

        public Dialer(){

        }

        public Dialer(string phoneNumber, string name, string assistingAgentName, string callNotes){
            PhoneNumber = phoneNumber;
            Name = name;
            AssistingAgentName = assistingAgentName;
            CallNotes = callNotes;
        }
    }
