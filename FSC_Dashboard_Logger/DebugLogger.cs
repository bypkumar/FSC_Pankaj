using System;
using System.IO;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FSC_Dashboard_Logger
{
    class DebugLogger
    {
        public static string GetTempPath()
        {
            string path = Environment.GetEnvironmentVariable("TEMP");
            if (path != null && !path.EndsWith("\\"))
                path += "\\";
            return path;
        }

        public static void AddLog(string msg)
        {
            StreamWriter sw = File.AppendText(GetTempPath() + "FSC_Dashboard.txt");
            try
            {
                string logLine = String.Format("{0:G}: {1}.", DateTime.Now, msg);
                sw.WriteLine(logLine);
            }
            finally
            {
                sw.Close();
            }
        }
    }
}
