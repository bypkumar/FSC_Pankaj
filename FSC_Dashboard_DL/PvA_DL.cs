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
    public class PvA_DL
    {

        SqlHelper sqlHelper;
        //LogExceptionDL logEx = null;

        FlightSection obj_FlightSection;
        DelayAnalysis obj_DelayAnalysis;

        public PvA_DL()
        {
            string connStr = ConfigurationManager.AppSettings["dbConnection"].ToString();
            sqlHelper = new SqlHelper(connStr);
            // logEx = new LogExceptionDL();
        }
        public List<DelayAnalysis> PVAGet_PannedVsActual_chart(SearchCriteria search)
        {
            List<DelayAnalysis> lstChartData = new List<DelayAnalysis>();
            try
            {
                SqlCommand cmd = sqlHelper.GetStoreProcedureCommand("[fsc].[FSC_Dashboard_planned_Actual_hour]");


                sqlHelper.AddParameter(cmd, "@Mod", SqlDbType.VarChar, 100, ParameterDirection.Input, search.Mod);
                sqlHelper.AddParameter(cmd, "@FromDate", SqlDbType.VarChar, 100, ParameterDirection.Input, search.FromDate);
                sqlHelper.AddParameter(cmd, "@ToDate", SqlDbType.VarChar, 100, ParameterDirection.Input, search.ToDate);
                sqlHelper.AddParameter(cmd, "@DateDropDownValue", SqlDbType.VarChar, 100, ParameterDirection.Input, search.DateDropDownValue);

                SqlDataReader Dr = sqlHelper.ExecuteReader(cmd);
                if (Dr == null || Dr.HasRows == false)
                {
                    //logEx.LogExceptionToDB(null, "No records returned from SP-H_ValidateUser", "Login - ValidateUser", 2);
                }

                if (Dr.HasRows)
                {
                    while (Dr.Read())
                    {
                        obj_DelayAnalysis = new DelayAnalysis();
                        obj_DelayAnalysis.Time = Convert.ToString(Dr["Time"]);
                        obj_DelayAnalysis.ActualFlightTime = Convert.ToString(Dr["ActualFlightTime"]);
                        obj_DelayAnalysis.PlannedFlightTime = Convert.ToString(Dr["PlannedFlightTime"]);
                        obj_DelayAnalysis.ActualFlightTime1 = Convert.ToString(Dr["ActualFlightTime1"]);
                        obj_DelayAnalysis.PlannedFlightTime1 = Convert.ToString(Dr["PlannedFlightTime1"]);

                        lstChartData.Add(obj_DelayAnalysis);
                    }
                }
            }
            catch (Exception ex)
            {
                string str = ex.Message;
            }
            return lstChartData;
        }
        public List<DelayAnalysis> PVAGet_DayWiseBlockHours_chart(SearchCriteria search)
        {
            List<DelayAnalysis> lstChartData = new List<DelayAnalysis>();
            try
            {
                SqlCommand cmd = sqlHelper.GetStoreProcedureCommand("[fsc].[FSC_Dashboard_planned_Actual_hour]");


                sqlHelper.AddParameter(cmd, "@Mod", SqlDbType.VarChar, 100, ParameterDirection.Input, search.Mod);
                sqlHelper.AddParameter(cmd, "@FromDate", SqlDbType.VarChar, 100, ParameterDirection.Input, search.FromDate);
                sqlHelper.AddParameter(cmd, "@ToDate", SqlDbType.VarChar, 100, ParameterDirection.Input, search.ToDate);
                sqlHelper.AddParameter(cmd, "@DateDropDownValue", SqlDbType.VarChar, 100, ParameterDirection.Input, search.DateDropDownValue);

                SqlDataReader Dr = sqlHelper.ExecuteReader(cmd);
                if (Dr == null || Dr.HasRows == false)
                {
                    //logEx.LogExceptionToDB(null, "No records returned from SP-H_ValidateUser", "Login - ValidateUser", 2);
                }

                if (Dr.HasRows)
                {
                    while (Dr.Read())
                    {
                        obj_DelayAnalysis = new DelayAnalysis();
                        obj_DelayAnalysis.FlightDate = Convert.ToString(Dr["flightdate"]);
                        obj_DelayAnalysis.ActualFlightTime = Convert.ToString(Dr["ActualFlightTime"]);
                        obj_DelayAnalysis.PlannedFlightTime = Convert.ToString(Dr["PlannedFlightTime"]);


                        lstChartData.Add(obj_DelayAnalysis);
                    }
                }
            }
            catch (Exception ex)
            {
                string str = ex.Message;
            }
            return lstChartData;
        }
        public List<DelayAnalysis> PVAGet_DayWiseBlockHours_chartForB737(SearchCriteria search)
        {
            List<DelayAnalysis> lstChartData = new List<DelayAnalysis>();
            try
            {
                SqlCommand cmd = sqlHelper.GetStoreProcedureCommand("[fsc].[FSC_Dashboard_planned_Actual_hour]");


                sqlHelper.AddParameter(cmd, "@Mod", SqlDbType.VarChar, 100, ParameterDirection.Input, search.Mod);
                sqlHelper.AddParameter(cmd, "@FromDate", SqlDbType.VarChar, 100, ParameterDirection.Input, search.FromDate);
                sqlHelper.AddParameter(cmd, "@ToDate", SqlDbType.VarChar, 100, ParameterDirection.Input, search.ToDate);
                sqlHelper.AddParameter(cmd, "@DateDropDownValue", SqlDbType.VarChar, 100, ParameterDirection.Input, search.DateDropDownValue);
                sqlHelper.AddParameter(cmd, "@AcCode", SqlDbType.VarChar, 100, ParameterDirection.Input, search.AcCode);

                SqlDataReader Dr = sqlHelper.ExecuteReader(cmd);
                if (Dr == null || Dr.HasRows == false)
                {
                    //logEx.LogExceptionToDB(null, "No records returned from SP-H_ValidateUser", "Login - ValidateUser", 2);
                }

                if (Dr.HasRows)
                {
                    while (Dr.Read())
                    {
                        obj_DelayAnalysis = new DelayAnalysis();
                        obj_DelayAnalysis.FlightDate = Convert.ToString(Dr["FlightDate"]);
                        obj_DelayAnalysis.Aircraft = Convert.ToString(Dr["Aircraft"]);
                        obj_DelayAnalysis.ActualFlightTime = Convert.ToString(Dr["ActualFlightTime"]);
                        obj_DelayAnalysis.PlannedFlightTime = Convert.ToString(Dr["PlannedFlightTime"]);


                        lstChartData.Add(obj_DelayAnalysis);
                    }
                }
            }
            catch (Exception ex)
            {
                string str = ex.Message;
            }
            return lstChartData;
        }
        public List<DelayAnalysis> PVAGet_DayWiseBlockHours_chartForB737F(SearchCriteria search)
        {
            List<DelayAnalysis> lstChartData = new List<DelayAnalysis>();
            try
            {
                SqlCommand cmd = sqlHelper.GetStoreProcedureCommand("[fsc].[FSC_Dashboard_planned_Actual_hour]");


                sqlHelper.AddParameter(cmd, "@Mod", SqlDbType.VarChar, 100, ParameterDirection.Input, search.Mod);
                sqlHelper.AddParameter(cmd, "@FromDate", SqlDbType.VarChar, 100, ParameterDirection.Input, search.FromDate);
                sqlHelper.AddParameter(cmd, "@ToDate", SqlDbType.VarChar, 100, ParameterDirection.Input, search.ToDate);
                sqlHelper.AddParameter(cmd, "@DateDropDownValue", SqlDbType.VarChar, 100, ParameterDirection.Input, search.DateDropDownValue);
                sqlHelper.AddParameter(cmd, "@AcCode", SqlDbType.VarChar, 100, ParameterDirection.Input, search.AcCode);

                SqlDataReader Dr = sqlHelper.ExecuteReader(cmd);
                if (Dr == null || Dr.HasRows == false)
                {
                    //logEx.LogExceptionToDB(null, "No records returned from SP-H_ValidateUser", "Login - ValidateUser", 2);
                }

                if (Dr.HasRows)
                {
                    while (Dr.Read())
                    {
                        obj_DelayAnalysis = new DelayAnalysis();
                        obj_DelayAnalysis.FlightDate = Convert.ToString(Dr["FlightDate"]);
                        obj_DelayAnalysis.Aircraft = Convert.ToString(Dr["Aircraft"]);
                        obj_DelayAnalysis.ActualFlightTime = Convert.ToString(Dr["ActualFlightTime"]);
                        obj_DelayAnalysis.PlannedFlightTime = Convert.ToString(Dr["PlannedFlightTime"]);


                        lstChartData.Add(obj_DelayAnalysis);
                    }
                }
            }
            catch (Exception ex)
            {
                string str = ex.Message;
            }
            return lstChartData;
        }
        public List<DelayAnalysis> PVAGet_DayWiseBlockHours_chartForQ400(SearchCriteria search)
        {
            List<DelayAnalysis> lstChartData = new List<DelayAnalysis>();
            try
            {
                SqlCommand cmd = sqlHelper.GetStoreProcedureCommand("[fsc].[FSC_Dashboard_planned_Actual_hour]");


                sqlHelper.AddParameter(cmd, "@Mod", SqlDbType.VarChar, 100, ParameterDirection.Input, search.Mod);
                sqlHelper.AddParameter(cmd, "@FromDate", SqlDbType.VarChar, 100, ParameterDirection.Input, search.FromDate);
                sqlHelper.AddParameter(cmd, "@ToDate", SqlDbType.VarChar, 100, ParameterDirection.Input, search.ToDate);
                sqlHelper.AddParameter(cmd, "@DateDropDownValue", SqlDbType.VarChar, 100, ParameterDirection.Input, search.DateDropDownValue);
                sqlHelper.AddParameter(cmd, "@AcCode", SqlDbType.VarChar, 100, ParameterDirection.Input, search.AcCode);

                SqlDataReader Dr = sqlHelper.ExecuteReader(cmd);
                if (Dr == null || Dr.HasRows == false)
                {
                    //logEx.LogExceptionToDB(null, "No records returned from SP-H_ValidateUser", "Login - ValidateUser", 2);
                }

                if (Dr.HasRows)
                {
                    while (Dr.Read())
                    {
                        obj_DelayAnalysis = new DelayAnalysis();
                        obj_DelayAnalysis.FlightDate = Convert.ToString(Dr["FlightDate"]);
                        obj_DelayAnalysis.Aircraft = Convert.ToString(Dr["Aircraft"]);
                        obj_DelayAnalysis.ActualFlightTime = Convert.ToString(Dr["ActualFlightTime"]);
                        obj_DelayAnalysis.PlannedFlightTime = Convert.ToString(Dr["PlannedFlightTime"]);


                        lstChartData.Add(obj_DelayAnalysis);
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
