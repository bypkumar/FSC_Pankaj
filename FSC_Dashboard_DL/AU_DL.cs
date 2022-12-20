using FSC_Dashboard_Entity;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.SqlClient;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FSC_Dashboard_DL
{
    public class AU_DL
    {

        SqlHelper sqlHelper;
        //LogExceptionDL logEx = null;

        FlightSection obj_FlightSection;
        DelayAnalysis obj_DelayAnalysis;

        public AU_DL()
        {
            string connStr = ConfigurationManager.AppSettings["dbConnection"].ToString();
            sqlHelper = new SqlHelper(connStr);
            // logEx = new LogExceptionDL();
        }
        public List<FlightSection> AUGet_Aircraft_Utilization_chart(SearchCriteria search)
        {
            List<FlightSection> lstChartData = new List<FlightSection>();
            try
            {
                SqlCommand cmd = sqlHelper.GetStoreProcedureCommand("[fsc].[ACU_AircraftUtilization]");


                sqlHelper.AddParameter(cmd, "@FDate", SqlDbType.VarChar, 100, ParameterDirection.Input, search.FromDate);
                sqlHelper.AddParameter(cmd, "@TDate", SqlDbType.VarChar, 100, ParameterDirection.Input, search.ToDate);
                sqlHelper.AddParameter(cmd, "@DateDropDownValue", SqlDbType.VarChar, 100, ParameterDirection.Input, search.DateDropDownValue);
                sqlHelper.AddParameter(cmd, "@GetDataFor", SqlDbType.VarChar, 100, ParameterDirection.Input, search.GetDataFor);
                sqlHelper.AddParameter(cmd, "@ACName", SqlDbType.VarChar, 100, ParameterDirection.Input, search.ACName);

                SqlDataReader Dr = sqlHelper.ExecuteReader(cmd);
                if (Dr == null || Dr.HasRows == false)
                {
                    //logEx.LogExceptionToDB(null, "No records returned from SP-H_ValidateUser", "Login - ValidateUser", 2);
                }

                if (Dr.HasRows)
                {
                    while (Dr.Read())
                    {
                        obj_FlightSection = new FlightSection();

                        obj_FlightSection.AircraftFamily = Convert.ToString(Dr["AircraftFamily"]);
                        obj_FlightSection.BlockTimeInHrs = Convert.ToString(Dr["BlockTimeInHrs"]);
                        //obj_FlightSection.AcName = Convert.ToString(Dr["AcName"]);
                        //obj_FlightSection.SumOfBlockTimeInHrs = Convert.ToString(Dr["SumOfBlockTimeInHrs"]);


                        lstChartData.Add(obj_FlightSection);
                    }
                }
            }
            catch (Exception ex)
            {
                string str = ex.Message;
            }
            return lstChartData;
        }
        public List<FlightSection> AUGet_FleetWiseBifurcation_chart(SearchCriteria search)
        {
            List<FlightSection> lstChartData = new List<FlightSection>();
            try
            {
                SqlCommand cmd = sqlHelper.GetStoreProcedureCommand("[fsc].[ACU_AircraftUtilization]");


                sqlHelper.AddParameter(cmd, "@FDate", SqlDbType.VarChar, 100, ParameterDirection.Input, search.FromDate);
                sqlHelper.AddParameter(cmd, "@TDate", SqlDbType.VarChar, 100, ParameterDirection.Input, search.ToDate);
                sqlHelper.AddParameter(cmd, "@DateDropDownValue", SqlDbType.VarChar, 100, ParameterDirection.Input, search.DateDropDownValue);
                sqlHelper.AddParameter(cmd, "@GetDataFor", SqlDbType.VarChar, 100, ParameterDirection.Input, search.GetDataFor);
                sqlHelper.AddParameter(cmd, "@ACName", SqlDbType.VarChar, 100, ParameterDirection.Input, search.ACName);

                SqlDataReader Dr = sqlHelper.ExecuteReader(cmd);
                if (Dr == null || Dr.HasRows == false)
                {
                    //logEx.LogExceptionToDB(null, "No records returned from SP-H_ValidateUser", "Login - ValidateUser", 2);
                }

                if (Dr.HasRows)
                {
                    while (Dr.Read())
                    {
                        obj_FlightSection = new FlightSection();

                        obj_FlightSection.AircraftFamily = Convert.ToString(Dr["AircraftFamily"]);
                        obj_FlightSection.BlockTimeInHrs = Convert.ToString(Dr["BlockTimeInHrs"]);
                        obj_FlightSection.AcName = Convert.ToString(Dr["AcName"]);
                        obj_FlightSection.SumOfBlockTimeInHrs = Convert.ToString(Dr["SumOfBlockTimeInHrs"]);

                        lstChartData.Add(obj_FlightSection);
                    }
                }
            }
            catch (Exception ex)
            {
                string str = ex.Message;
            }
            return lstChartData;
        }
        public List<FlightSection> AUGet_AircraftTailNoWise_chart(SearchCriteria search)
        {
            List<FlightSection> lstChartData = new List<FlightSection>();
            try
            {
                SqlCommand cmd = sqlHelper.GetStoreProcedureCommand("[fsc].[ACU_AircraftUtilization]");


                sqlHelper.AddParameter(cmd, "@FDate", SqlDbType.VarChar, 100, ParameterDirection.Input, search.FromDate);
                sqlHelper.AddParameter(cmd, "@TDate", SqlDbType.VarChar, 100, ParameterDirection.Input, search.ToDate);
                sqlHelper.AddParameter(cmd, "@DateDropDownValue", SqlDbType.VarChar, 100, ParameterDirection.Input, search.DateDropDownValue);
                sqlHelper.AddParameter(cmd, "@GetDataFor", SqlDbType.VarChar, 100, ParameterDirection.Input, search.GetDataFor);
                sqlHelper.AddParameter(cmd, "@ACName", SqlDbType.VarChar, 100, ParameterDirection.Input, search.ACName);

                SqlDataReader Dr = sqlHelper.ExecuteReader(cmd);
                if (Dr == null || Dr.HasRows == false)
                {
                    //logEx.LogExceptionToDB(null, "No records returned from SP-H_ValidateUser", "Login - ValidateUser", 2);
                }

                if (Dr.HasRows)
                {
                    while (Dr.Read())
                    {
                        obj_FlightSection = new FlightSection();

                        obj_FlightSection.AircraftFamily = Convert.ToString(Dr["AircraftFamily"]);
                        obj_FlightSection.BlockTimeInHrs = Convert.ToString(Dr["BlockTimeInHrs"]);
                        obj_FlightSection.AcName = Convert.ToString(Dr["AcName"]);
                        obj_FlightSection.AcRegNo = Convert.ToString(Dr["AcRegNo"]);
                        obj_FlightSection.SumOfBlockTimeInHrs = Convert.ToString(Dr["SumOfBlockTimeInHrs"]);

                        lstChartData.Add(obj_FlightSection);
                    }
                }
            }
            catch (Exception ex)
            {
                string str = ex.Message;
            }
            return lstChartData;
        }

    }
}
