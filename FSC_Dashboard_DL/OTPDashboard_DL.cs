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
    public class OTPDashboard_DL
    {

        SqlHelper sqlHelper;
        //LogExceptionDL logEx = null;

        FlightSection obj_FlightSection;
        DelayAnalysis obj_DelayAnalysis;
        FlightTypeSector obj_FlightTypeSector;
        Sector obj_Sector;

        public OTPDashboard_DL()
        {
            string connStr = ConfigurationManager.AppSettings["dbConnection"].ToString();
            sqlHelper = new SqlHelper(connStr);
            // logEx = new LogExceptionDL();
        }




        #region Metro wise 

        public List<FlightSection> OTPGet_flight_type_analysis_chart(SearchCriteria search)
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


        #endregion Metro wise 

        #region Overall OTP 

        public List<FlightSection> OTPGet_Delay_analysis_chart(SearchCriteria search)
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
        public List<FlightSection> OTPGet_Delay_analysis_Datewisechart(SearchCriteria search)
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
                        obj_FlightSection.FlightDate = Convert.ToString(Dr["FlightDate"]);
                        obj_FlightSection.OTPPercentage = Convert.ToString(Dr["OTPPercentage"]);
                        //obj_FlightSection.InternationalOTPPercentage = Convert.ToString(Dr["InternationalOTPPercentage"]);


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
        #endregion Overall OTP 

        #region Sector OTP 
        public List<DelayAnalysis> OTPGetSector_Delay_analysis_chart(SearchCriteria search)
        {
            List<DelayAnalysis> lstChartData = new List<DelayAnalysis>();
            try
            {
                SqlCommand cmd = sqlHelper.GetStoreProcedureCommand("[fsc].[OnLoadDelayGroupCount1]");


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

        public List<Sector> getSectorsLst(SearchCriteria search)
        {
            List<Sector> lstData = new List<Sector>();
            try
            {
                SqlCommand cmd = sqlHelper.GetStoreProcedureCommand("[fsc].[OTP_GetFilterData]");

                sqlHelper.AddParameter(cmd, "@FDate", SqlDbType.VarChar, 100, ParameterDirection.Input, search.FromDate);
                sqlHelper.AddParameter(cmd, "@TDate", SqlDbType.VarChar, 100, ParameterDirection.Input, search.ToDate);
                sqlHelper.AddParameter(cmd, "@DateDropDownValue", SqlDbType.VarChar, 100, ParameterDirection.Input, search.DateDropDownValue_two);
                //sqlHelper.AddParameter(cmd, "@DateDropDownValue", SqlDbType.VarChar, 100, ParameterDirection.Input, "Previous Quarter");
                sqlHelper.AddParameter(cmd, "@GetDataFor", SqlDbType.VarChar, 100, ParameterDirection.Input, "Sector");

                SqlDataReader Dr = sqlHelper.ExecuteReader(cmd);
                if (Dr == null || Dr.HasRows == false)
                {
                    //logEx.LogExceptionToDB(null, "No records returned from SP-H_ValidateUser", "Login - ValidateUser", 2);
                }

                if (Dr.HasRows)
                {
                    while (Dr.Read())
                    {
                        obj_Sector = new Sector();
                        //obj_Sector.Id = Convert.ToString(Dr["ID"]);
                        obj_Sector.SectorName = Convert.ToString(Dr["Sector"]);
                        obj_Sector.ToCityCode = Convert.ToString(Dr["ToCityCode"]);
                        obj_Sector.FromcityCode = Convert.ToString(Dr["FromcityCode"]);

                        lstData.Add(obj_Sector);
                    }
                }
            }
            catch (Exception ex)
            {
                string str = ex.Message;
            }
            return lstData;
        }

        public List<FlightSection> SectorWise_bubble_chart(SearchCriteria search)
        {
            List<FlightSection> lstChartData = new List<FlightSection>();
            try
            {
                SqlCommand cmd = sqlHelper.GetStoreProcedureCommand("[fsc].[OTP_OnTimePerformancePercentage]");


                sqlHelper.AddParameter(cmd, "@FDate", SqlDbType.VarChar, 100, ParameterDirection.Input, search.FromDate);
                sqlHelper.AddParameter(cmd, "@TDate", SqlDbType.VarChar, 100, ParameterDirection.Input, search.ToDate);
                sqlHelper.AddParameter(cmd, "@DateDropDownValue", SqlDbType.VarChar, 100, ParameterDirection.Input, search.DateDropDownValue);
                sqlHelper.AddParameter(cmd, "@GetDataFor", SqlDbType.VarChar, 100, ParameterDirection.Input, search.GetDataFor);
                sqlHelper.AddParameter(cmd, "@Sector", SqlDbType.VarChar, 8000, ParameterDirection.Input, search.Sector);

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

                        obj_FlightSection.Sector = Convert.ToString(Dr["Sector"]);
                        obj_FlightSection.SectorCount = Convert.ToString(Dr["SectorCount"]);
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



        #endregion Sector OTP 


        #region Flight OTP 

        public List<DelayAnalysis> OTPGetFlight_Delay_analysis_chart(SearchCriteria search)
        {
            List<DelayAnalysis> lstChartData = new List<DelayAnalysis>();
            try
            {
                SqlCommand cmd = sqlHelper.GetStoreProcedureCommand("[fsc].[OnLoadDelayGroupCount1]");


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

        public List<FlightTypeSector> getFlightTypeSectorsLst(SearchCriteria search)
        {
            List<FlightTypeSector> lstData = new List<FlightTypeSector>();
            try
            {
                SqlCommand cmd = sqlHelper.GetStoreProcedureCommand("[fsc].[OTP_GetFilterData]");


                sqlHelper.AddParameter(cmd, "@FDate", SqlDbType.VarChar, 100, ParameterDirection.Input, search.FromDate);
                sqlHelper.AddParameter(cmd, "@TDate", SqlDbType.VarChar, 100, ParameterDirection.Input, search.ToDate);
                sqlHelper.AddParameter(cmd, "@DateDropDownValue", SqlDbType.VarChar, 100, ParameterDirection.Input, search.DateDropDownValue_two);
                sqlHelper.AddParameter(cmd, "@GetDataFor", SqlDbType.VarChar, 100, ParameterDirection.Input, "FLTSector");

                SqlDataReader Dr = sqlHelper.ExecuteReader(cmd);
                if (Dr == null || Dr.HasRows == false)
                {
                    //logEx.LogExceptionToDB(null, "No records returned from SP-H_ValidateUser", "Login - ValidateUser", 2);
                }

                if (Dr.HasRows)
                {
                    while (Dr.Read())
                    {
                        obj_FlightTypeSector = new FlightTypeSector();
                        //obj_FlightTypeSector.Id = Convert.ToString(Dr["ID"]);
                        obj_FlightTypeSector.flight_Type_Sector = Convert.ToString(Dr["FLTSector"]);

                        lstData.Add(obj_FlightTypeSector);
                    }
                }
            }
            catch (Exception ex)
            {
                string str = ex.Message;
            }
            return lstData;
        }


        public List<FlightSection> FlightTypeSectorWise_bubble_chart(SearchCriteria search)
        {
            List<FlightSection> lstChartData = new List<FlightSection>();
            try
            {
                SqlCommand cmd = sqlHelper.GetStoreProcedureCommand("[fsc].[OTP_OnTimePerformancePercentage]");


                sqlHelper.AddParameter(cmd, "@FDate", SqlDbType.VarChar, 100, ParameterDirection.Input, search.FromDate);
                sqlHelper.AddParameter(cmd, "@TDate", SqlDbType.VarChar, 100, ParameterDirection.Input, search.ToDate);
                sqlHelper.AddParameter(cmd, "@DateDropDownValue", SqlDbType.VarChar, 100, ParameterDirection.Input, search.DateDropDownValue);
                sqlHelper.AddParameter(cmd, "@GetDataFor", SqlDbType.VarChar, 100, ParameterDirection.Input, search.GetDataFor);
                sqlHelper.AddParameter(cmd, "@Sector", SqlDbType.VarChar, 8000, ParameterDirection.Input, search.FSector);

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

                        obj_FlightSection.FLTSector = Convert.ToString(Dr["FLTSector"]);
                        obj_FlightSection.FLTSectorCount = Convert.ToString(Dr["FLTSectorCount"]);
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



        #endregion Flight OTP 

        #region Region OTP 
        public List<FlightSection> OTPGetRegion_Delay_analysis_chart(SearchCriteria search)
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

                        //obj_FlightSection.FromCity = Convert.ToString(Dr["FromCity"]);
                        //obj_FlightSection.CityCode = Convert.ToString(Dr["CityCode"]);
                        obj_FlightSection.Region = Convert.ToString(Dr["Region"]);
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
        public List<FlightSection> OTPGetRegionCity_Delay_analysis_chart(SearchCriteria search)
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

                        obj_FlightSection.FromCity = Convert.ToString(Dr["FromCity"]);
                        obj_FlightSection.CityCode = Convert.ToString(Dr["CityCode"]);
                        obj_FlightSection.Region = Convert.ToString(Dr["Region"]);
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

        #endregion Region OTP 

        #region Grid
        public List<FlightSection> Get_SectorDataForGrid(SearchCriteria search)
        {
            List<FlightSection> lstAirField = new List<FlightSection>();
            try
            {

                SqlCommand cmd = sqlHelper.GetStoreProcedureCommand("[fsc].[OTP_OnTimePerformancePercentage]");


                sqlHelper.AddParameter(cmd, "@FDate", SqlDbType.VarChar, 100, ParameterDirection.Input, search.FromDate);
                sqlHelper.AddParameter(cmd, "@TDate", SqlDbType.VarChar, 100, ParameterDirection.Input, search.ToDate);
                sqlHelper.AddParameter(cmd, "@DateDropDownValue", SqlDbType.VarChar, 100, ParameterDirection.Input, search.DateDropDownValue);
                sqlHelper.AddParameter(cmd, "@GetDataFor", SqlDbType.VarChar, 100, ParameterDirection.Input, search.GetDataFor);
                sqlHelper.AddParameter(cmd, "@Sector", SqlDbType.VarChar, 8000, ParameterDirection.Input, search.Sector);

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

                        obj_FlightSection.Sector = Convert.ToString(Dr["Sector"]);
                        obj_FlightSection.SectorCount = Convert.ToString(Dr["SectorCount"]);
                        //obj_FlightSection.FromcityCode = Convert.ToString(Dr["FromcityCode"]);
                        //obj_FlightSection.ToCityCode = Convert.ToString(Dr["ToCityCode"]);
                        obj_FlightSection.OTPPercentage = Convert.ToString(Dr["OTPPercentage"]);

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
        public List<FlightSection> Get_FlightDataForGrid(SearchCriteria search)
        {
            List<FlightSection> lstAirField = new List<FlightSection>();
            try
            {

                SqlCommand cmd = sqlHelper.GetStoreProcedureCommand("[fsc].[OTP_OnTimePerformancePercentage]");


                sqlHelper.AddParameter(cmd, "@FDate", SqlDbType.VarChar, 100, ParameterDirection.Input, search.FromDate);
                sqlHelper.AddParameter(cmd, "@TDate", SqlDbType.VarChar, 100, ParameterDirection.Input, search.ToDate);
                sqlHelper.AddParameter(cmd, "@DateDropDownValue", SqlDbType.VarChar, 100, ParameterDirection.Input, search.DateDropDownValue);
                sqlHelper.AddParameter(cmd, "@GetDataFor", SqlDbType.VarChar, 100, ParameterDirection.Input, search.GetDataFor);
                sqlHelper.AddParameter(cmd, "@Sector", SqlDbType.VarChar, 8000, ParameterDirection.Input, search.FSector);

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

                        obj_FlightSection.FLTSector = Convert.ToString(Dr["FLTSector"]);
                        obj_FlightSection.FLTSectorCount = Convert.ToString(Dr["FLTSectorCount"]);
                        obj_FlightSection.OTPPercentage = Convert.ToString(Dr["OTPPercentage"]);

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

        #endregion Grid
    }
}
