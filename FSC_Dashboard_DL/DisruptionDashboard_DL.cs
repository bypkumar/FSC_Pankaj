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
    public class DisruptionDashboard_DL
    {

        SqlHelper sqlHelper;

        FlightSection obj_FlightSection;
        DelayAnalysis obj_DelayAnalysis;
        Dropdown obj_Dropdown;

        public DisruptionDashboard_DL()
        {
            string connStr = ConfigurationManager.AppSettings["dbConnection"].ToString();
            sqlHelper = new SqlHelper(connStr);
            // logEx = new LogExceptionDL();
        }


        public List<FlightSection> Get_Flight_Type_Wise_Delay_chart(SearchCriteria search)
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

                        obj_FlightSection.FlightType = Convert.ToString(Dr["FlightType"]);
                        obj_FlightSection.FlightCount = Convert.ToString(Dr["FlightCount"]);

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

        public List<FlightSection> Get_SelectedFlight_Type_Wise_Delay_chart(SearchCriteria search)
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

                        obj_FlightSection.Reason = Convert.ToString(Dr["Reason"]);
                        obj_FlightSection.ReasonCount = Convert.ToString(Dr["ReasonCount"]);

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

        public List<FlightSection> Get_SelectedReason_Wise_Flight_chart(SearchCriteria search)
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

                        obj_FlightSection.FlightDate = Convert.ToString(Dr["FlightDate"]);
                        obj_FlightSection.FlightNo = Convert.ToString(Dr["FlightNo"]);
                        obj_FlightSection.DelayTime = Convert.ToString(Dr["DelayTime"]);

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

        public List<FlightSection> Get_Delay_Wise_Flight_Count_chart(SearchCriteria search)
        {
            List<FlightSection> lstChartData = new List<FlightSection>();
            try
            {
                SqlCommand cmd = sqlHelper.GetStoreProcedureCommand("[fsc].[FSC_Dashboard_Flight_Type_Analysis_Chart]");


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

                        obj_FlightSection.Pid = Convert.ToInt32(Dr["Pid"]);
                        obj_FlightSection.FlightType = Convert.ToString(Dr["FlightType"]);
                        obj_FlightSection.Value = Convert.ToString(Dr["Value"]);
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

        public List<FlightSection> Get_Flight_Wise_Delay_chart(SearchCriteria search)
        {
            List<FlightSection> lstChartData = new List<FlightSection>();
            try
            {
                SqlCommand cmd = sqlHelper.GetStoreProcedureCommand("[fsc].[FSC_Dashboard_Flight_Type_Analysis_Chart]");


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

                        obj_FlightSection.Pid = Convert.ToInt32(Dr["Pid"]);
                        obj_FlightSection.FlightType = Convert.ToString(Dr["FlightType"]);
                        obj_FlightSection.Value = Convert.ToString(Dr["Value"]);
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

        public List<FlightSection> Get_Flight_Type_Wise_Diverted_chart(SearchCriteria search)
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

        public List<FlightSection> Get_Diverted_Flight_Details_chart(SearchCriteria search)
        {
            List<FlightSection> lstChartData = new List<FlightSection>();
            try
            {
                SqlCommand cmd = sqlHelper.GetStoreProcedureCommand("[fsc].[FSC_Dashboard_Flight_Type_Analysis_Chart]");


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

                        obj_FlightSection.Pid = Convert.ToInt32(Dr["Pid"]);
                        obj_FlightSection.FlightType = Convert.ToString(Dr["FlightType"]);
                        obj_FlightSection.Value = Convert.ToString(Dr["Value"]);
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

        public List<FlightSection> Get_Flight_Type_Wise_Cancelled_chart(SearchCriteria search)
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

                        obj_FlightSection.FlightType = Convert.ToString(Dr["FlightType"]);
                        obj_FlightSection.FlightCount = Convert.ToString(Dr["FlightCount"]);

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

        public List<FlightSection> Get_Cancellation_Flight_Details_chart(SearchCriteria search)
        {
            List<FlightSection> lstChartData = new List<FlightSection>();
            try
            {
                SqlCommand cmd = sqlHelper.GetStoreProcedureCommand("[fsc].[FSC_Dashboard_Flight_Type_Analysis_Chart]");


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

                        obj_FlightSection.Pid = Convert.ToInt32(Dr["Pid"]);
                        obj_FlightSection.FlightType = Convert.ToString(Dr["FlightType"]);
                        obj_FlightSection.Value = Convert.ToString(Dr["Value"]);
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

        public List<Dropdown> Get_DropdownListForDateRange(SearchCriteria search)
        {
            List<Dropdown> lstAirField = new List<Dropdown>();
            try
            {
                SqlCommand cmd = sqlHelper.GetStoreProcedureCommand("[fsc].[OTP_GetFilterData]");

                sqlHelper.AddParameter(cmd, "@GetDataFor", SqlDbType.VarChar, 100, ParameterDirection.Input, search.GetDataFor);
                sqlHelper.AddParameter(cmd, "@FDate", SqlDbType.VarChar, 100, ParameterDirection.Input, search.FromDate);
                sqlHelper.AddParameter(cmd, "@TDate", SqlDbType.VarChar, 100, ParameterDirection.Input, search.ToDate);
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
                        obj_Dropdown = new Dropdown();
                        obj_Dropdown.Id = Convert.ToString(Dr["Id"]);
                        obj_Dropdown.DateRange = Convert.ToString(Dr["DateRange"]);

                        lstAirField.Add(obj_Dropdown);
                    }
                }

            }
            catch (Exception ex)
            {
                string str = ex.Message;
            }
            return lstAirField;
        }

        public List<FlightSection> Get_DivertedDataForGrid(SearchCriteria search)
        {
            List<FlightSection> lstAirField = new List<FlightSection>();
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
                        obj_FlightSection.FlightDate = Convert.ToString(Dr["FlightDate"]);
                        obj_FlightSection.FlightNo = Convert.ToString(Dr["FlightNo"]);
                        obj_FlightSection.Sector = Convert.ToString(Dr["Sector"]);
                        obj_FlightSection.DivertedTo = Convert.ToString(Dr["Diverted To"]);
                        obj_FlightSection.AircraftType = Convert.ToString(Dr["AircraftType"]);
                        obj_FlightSection.TailNo = Convert.ToString(Dr["TailNo"]);
                        obj_FlightSection.DiversionReason = Convert.ToString(Dr["Diversion Reason"]);
                        
                        lstAirField.Add(obj_FlightSection);
                    }
                }
            }
            catch (Exception ex)
            {
                string str = ex.Message;
            }
            return lstAirField;
        }
        public List<FlightSection> Get_CancelledDataForGrid(SearchCriteria search)
        {
            List<FlightSection> lstAirField = new List<FlightSection>();
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
                        obj_FlightSection.FlightDate = Convert.ToString(Dr["FlightDate"]);
                        obj_FlightSection.FlightNo = Convert.ToString(Dr["FlightNo"]);
                        obj_FlightSection.Sector = Convert.ToString(Dr["Sector"]);
                        //obj_FlightSection.DivertedTo = Convert.ToString(Dr["MonthName"]);
                        obj_FlightSection.AircraftType = Convert.ToString(Dr["AircraftType"]);
                        obj_FlightSection.TailNo = Convert.ToString(Dr["TailNo"]);
                        obj_FlightSection.Reason = Convert.ToString(Dr["Reason"]);

                        lstAirField.Add(obj_FlightSection);
                    }
                }
            }
            catch (Exception ex)
            {
                string str = ex.Message;
            }
            return lstAirField;
        }

    }
}
