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
    public class Dashboard_DL
    {

        SqlHelper sqlHelper;
        //LogExceptionDL logEx = null;

        FlightSection obj_FlightSection;
        DelayAnalysis obj_DelayAnalysis;

        public Dashboard_DL()
        {
            string connStr = ConfigurationManager.AppSettings["dbConnection"].ToString();
            sqlHelper = new SqlHelper(connStr);
            // logEx = new LogExceptionDL();
        }




        #region Flight Section

        public FlightSection Get_Flight_International_Domastic_Departs(SearchCriteria search)
        {
            try
            {
                SqlCommand cmd = sqlHelper.GetStoreProcedureCommand("[fsc].[FSC_Dashboard_Total_Domestic_international_flightCount]");

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
                        obj_FlightSection = new FlightSection();
                        obj_FlightSection.InterNational_Flight = Convert.ToString(Dr["InterNational_Flight"]);
                        obj_FlightSection.Domestic_Flight = Convert.ToString(Dr["Domestic_Flight"]);
                        obj_FlightSection.Total = Convert.ToString(Dr["Total"]);
                        obj_FlightSection.International_FlightDeparture = Convert.ToString(Dr["International_FlightDeparture"]);
                        obj_FlightSection.Domestic_Flight_Departure = Convert.ToString(Dr["Domestic_Flight_Departure"]);
                        //obj_FlightSection.sectortype = Convert.ToString(Dr["sectortype"]);                        
                    }
                }
            }
            catch (Exception ex)
            {
                string str = ex.Message;
            }
            return obj_FlightSection;
        }

        public List<FlightSection> Get_flight_type_analysis_chart(SearchCriteria search)
        {
            List<FlightSection> lstChartData = new List<FlightSection>();
            try
            {
                SqlCommand cmd = sqlHelper.GetStoreProcedureCommand("[fsc].[FSC_Dashboard_Total_Flighttype]");


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
                        obj_FlightSection = new FlightSection();

                        //obj_FlightSection.Pid = Convert.ToInt32(Dr["Pid"]);
                        obj_FlightSection.FlightType = Convert.ToString(Dr["FlightType"]);
                        obj_FlightSection.FlightCount = Convert.ToString(Dr["FlightCount"]);
                        //obj_Dashboardchart.BaseName = Convert.ToString(Dr["Base"]);

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

        public List<FlightSection> Get_disruption_chart(SearchCriteria search)
        {
            List<FlightSection> lstChartData = new List<FlightSection>();
            try
            {
                SqlCommand cmd = sqlHelper.GetStoreProcedureCommand("[fsc].[FSC_Dashboard_Disruption_Details]");


                sqlHelper.AddParameter(cmd, "@FromDate", SqlDbType.VarChar, 100, ParameterDirection.Input, search.FromDate);
                sqlHelper.AddParameter(cmd, "@ToDate", SqlDbType.VarChar, 100, ParameterDirection.Input, search.ToDate);
                sqlHelper.AddParameter(cmd, "@DateDropDownValue", SqlDbType.VarChar, 100, ParameterDirection.Input, search.DateDropDownValue);
                sqlHelper.AddParameter(cmd, "@FlightType", SqlDbType.VarChar, 100, ParameterDirection.Input, search.FlightType);
                sqlHelper.AddParameter(cmd, "@DelayCode", SqlDbType.VarChar, 100, ParameterDirection.Input, search.DelayCode);
                sqlHelper.AddParameter(cmd, "@Code", SqlDbType.VarChar, 100, ParameterDirection.Input, search.Code);
                sqlHelper.AddParameter(cmd, "@Mod", SqlDbType.VarChar, 100, ParameterDirection.Input, search.Mod);

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

                        //obj_FlightSection.Pid = Convert.ToInt32(Dr["Pid"]);
                        obj_FlightSection.Status = Convert.ToString(Dr["Status"]);
                        obj_FlightSection.FlightType = Convert.ToString(Dr["FlightType"]);
                        obj_FlightSection.FlightCount = Convert.ToString(Dr["FlightCount"]);
                        //obj_Dashboardchart.BaseName = Convert.ToString(Dr["Base"]);

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

        public List<FlightSection> Get_Aircraft_Utilization_chart(SearchCriteria search)
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

                        //obj_FlightSection.Pid = Convert.ToInt32(Dr["Pid"]);
                        obj_FlightSection.AircraftFamily = Convert.ToString(Dr["AircraftFamily"]);
                        obj_FlightSection.BlockTimeInHrs = Convert.ToString(Dr["BlockTimeInHrs"]);


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
        public List<FlightSection> Get_OverAllOTP_chart(SearchCriteria search)
        {
            List<FlightSection> lstChartData = new List<FlightSection>();
            try
            {
                SqlCommand cmd = sqlHelper.GetStoreProcedureCommand("[fsc].[OTP_OnTimePerformancePercentage]");


                sqlHelper.AddParameter(cmd, "@FDate", SqlDbType.VarChar, 100, ParameterDirection.Input, search.FromDate);
                sqlHelper.AddParameter(cmd, "@TDate", SqlDbType.VarChar, 100, ParameterDirection.Input, search.ToDate);
                sqlHelper.AddParameter(cmd, "@DateDropDownValue", SqlDbType.VarChar, 100, ParameterDirection.Input, search.DateDropDownValue);
                sqlHelper.AddParameter(cmd, "@GetDataFor", SqlDbType.VarChar, 100, ParameterDirection.Input, search.GetDataFor);
                sqlHelper.AddParameter(cmd, "@Sector", SqlDbType.VarChar, 100, ParameterDirection.Input, search.Sector);

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

                        //obj_FlightSection.Pid = Convert.ToInt32(Dr["Pid"]);
                        //obj_FlightSection.Name = Convert.ToString(Dr["Name"]);
                        //obj_FlightSection.OTPCount = Convert.ToString(Dr["OTPCount"]);
                        //obj_FlightSection.InternationalOTPPercentage = Convert.ToString(Dr["InternationalOTPPercentage"]);
                        obj_FlightSection.Sector = Convert.ToString(Dr["Sector"]);
                        //obj_FlightSection.FromcityCode = Convert.ToString(Dr["FromcityCode"]);
                        //obj_FlightSection.ToCityCode = Convert.ToString(Dr["ToCityCode"]);
                        obj_FlightSection.OTPPercentage = Convert.ToString(Dr["OTPPercentage"]);

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
        public List<FlightSection> Get_SectorTypeOTP_chart(SearchCriteria search)
        {
            List<FlightSection> lstChartData = new List<FlightSection>();
            try
            {
                SqlCommand cmd = sqlHelper.GetStoreProcedureCommand("[fsc].[OTP_OnTimePerformancePercentage]");


                sqlHelper.AddParameter(cmd, "@FDate", SqlDbType.VarChar, 100, ParameterDirection.Input, search.FromDate);
                sqlHelper.AddParameter(cmd, "@TDate", SqlDbType.VarChar, 100, ParameterDirection.Input, search.ToDate);
                sqlHelper.AddParameter(cmd, "@DateDropDownValue", SqlDbType.VarChar, 100, ParameterDirection.Input, search.DateDropDownValue);
                sqlHelper.AddParameter(cmd, "@GetDataFor", SqlDbType.VarChar, 100, ParameterDirection.Input, search.GetDataFor);
                sqlHelper.AddParameter(cmd, "@Sector", SqlDbType.VarChar, 100, ParameterDirection.Input, search.Sector);

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

                        //obj_FlightSection.Pid = Convert.ToInt32(Dr["Pid"]);
                        obj_FlightSection.Sector = Convert.ToString(Dr["Sector"]);
                        //obj_FlightSection.FromcityCode = Convert.ToString(Dr["FromcityCode"]);
                        //obj_FlightSection.ToCityCode = Convert.ToString(Dr["ToCityCode"]);
                        obj_FlightSection.OTPPercentage = Convert.ToString(Dr["OTPPercentage"]);

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
        public List<FlightSection> Get_MetroWiseOTP_chart(SearchCriteria search)
        {
            List<FlightSection> lstChartData = new List<FlightSection>();
            try
            {
                SqlCommand cmd = sqlHelper.GetStoreProcedureCommand("[fsc].[OTP_OnTimePerformancePercentage]");


                sqlHelper.AddParameter(cmd, "@FDate", SqlDbType.VarChar, 100, ParameterDirection.Input, search.FromDate);
                sqlHelper.AddParameter(cmd, "@TDate", SqlDbType.VarChar, 100, ParameterDirection.Input, search.ToDate);
                sqlHelper.AddParameter(cmd, "@DateDropDownValue", SqlDbType.VarChar, 100, ParameterDirection.Input, search.DateDropDownValue);
                sqlHelper.AddParameter(cmd, "@GetDataFor", SqlDbType.VarChar, 100, ParameterDirection.Input, search.GetDataFor);
                sqlHelper.AddParameter(cmd, "@Sector", SqlDbType.VarChar, 100, ParameterDirection.Input, search.Sector);

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

                        //obj_FlightSection.Pid = Convert.ToInt32(Dr["Pid"]);
                       
                        obj_FlightSection.MetroCity = Convert.ToString(Dr["MetroCity"]);
                        obj_FlightSection.OTPPercentage = Convert.ToString(Dr["OTPPercentage"]);

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
        
        #endregion

        #region Delay Analysis

        public List<DelayAnalysis> Get_Delay_analysis_chart(SearchCriteria search)
        {
            List<DelayAnalysis> lstChartData = new List<DelayAnalysis>();
            try
            {
                SqlCommand cmd = sqlHelper.GetStoreProcedureCommand("[fsc].[OnLoadDelayGroupCount]");


                //sqlHelper.AddParameter(cmd, "@FromDate", SqlDbType.VarChar, 100, ParameterDirection.Input, search.FromDate);
                //sqlHelper.AddParameter(cmd, "@ToDate", SqlDbType.VarChar, 100, ParameterDirection.Input, search.ToDate);
                //sqlHelper.AddParameter(cmd, "@DateDropDownValue", SqlDbType.VarChar, 100, ParameterDirection.Input, search.DateDropDownValue);

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
                        obj_DelayAnalysis.GroupCode = Convert.ToString(Dr["GroupCode"]);
                        obj_DelayAnalysis.DelayCount = Convert.ToString(Dr["DelayCount"]);                  

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

        public List<DelayAnalysis> Get_PannedVsActual_chart(SearchCriteria search)
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
                        //obj_DelayAnalysis.Time = Convert.ToString(Dr["Time"]);
                        obj_DelayAnalysis.Aircraft = Convert.ToString(Dr["Aircraft"]);
                        obj_DelayAnalysis.ActualFlightTime = Convert.ToString(Dr["ActualFlightTime"]);
                        obj_DelayAnalysis.PlannedFlightTime = Convert.ToString(Dr["PlannedFlightTime"]);
                        //obj_DelayAnalysis.ActualFlightTime1 = Convert.ToString(Dr["ActualFlightTime1"]);
                        //obj_DelayAnalysis.PlannedFlightTime1 = Convert.ToString(Dr["PlannedFlightTime1"]);

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

        #endregion


    }
}
