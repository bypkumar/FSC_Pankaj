using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FSC_Dashboard_Entity
{
    public class DelayAnalysis
    {
        public string GroupCode { get; set; }
        public string DelayCount { get; set; }

        public string ActualFlightTime { get; set; }
        public string PlannedFlightTime { get; set; }
        public string ActualFlightTime1 { get; set; }
        public string PlannedFlightTime1 { get; set; }
        public string FlightDate { get; set; }
        public string Time { get; set; }
        public string Aircraft { get; set; }
    }
}
