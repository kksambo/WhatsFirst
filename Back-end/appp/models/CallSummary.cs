using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;


    public class CallSummary
    {
        public int Id { get; set; }
        public int UnansweredCalls { get; set; }
        public int WhatsAppCalls { get; set; }
        public int NormalCalls { get; set; }
        public int CallMadeToday { get; set; }

        public CallSummary(){

        }

        public CallSummary(int unansweredCalls, int whatsAppCalls, int normalCalls, int callMadeToday){
            UnansweredCalls = unansweredCalls;
            WhatsAppCalls = whatsAppCalls;
            NormalCalls = normalCalls;
            CallMadeToday = callMadeToday;
        }
    }
