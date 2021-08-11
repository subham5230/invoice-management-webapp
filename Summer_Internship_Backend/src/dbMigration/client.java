package dbMigration;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.sql.Types;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

public class client {

    public static java.sql.Date format_clearDate(String dt) {

        Date utilDate = null;
        try{
            utilDate = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").parse(dt);
        } catch (ParseException e) {
            e.printStackTrace();
        }


        return new java.sql.Date(utilDate.getTime());
    }

    public static java.sql.Date format_postingDate(String dt){

        java.util.Date utilDate = null;
        try{
            utilDate = new SimpleDateFormat("yyyy-MM-dd").parse(dt);
        } catch (ParseException e) {
            e.printStackTrace();
        }
        return new java.sql.Date(utilDate.getTime());
    }

    public static java.sql.Date formatDate(String dt){

        java.util.Date utilDate = null;
        try{
            utilDate = new SimpleDateFormat("yyyyMMdd").parse(dt);
        } catch (ParseException e) {
            e.printStackTrace();
        }
        return new java.sql.Date(utilDate.getTime());
    }

    public static double parseDouble(String str){ return Double.parseDouble(str); }

    public static PreparedStatement make_sql_statement(Connection conn, String str){

        PreparedStatement statement = null;
        try{
            statement = conn.prepareStatement(str);
        } catch (SQLException se) {
            se.printStackTrace();
        }

        return statement;
    }

    //Driver Code
    public static void main(String[] args) {

        DBConnection db = new DBConnection();
        db.makeConn();
        Connection conn = db.getConn();

        Invoice invObj = new Invoice();

        String sqlStatement = "INSERT INTO invoice_details VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

        PreparedStatement pstmt = make_sql_statement(conn, sqlStatement);


        String line;
        try
        {

            BufferedReader br = new BufferedReader(new FileReader("C:\\Users\\subha\\Desktop\\1806259.csv"));
            System.out.println("CSV file imported successfully!");

            int i = 0;

            while ((line = br.readLine()) != null)   //returns a Boolean value
            {
                if (i==0){
                    i++;
                    continue;
                }

                i++;

                String[] invoice = line.split(",");    // use comma as separator

                int j = 0;

                invObj.setBusiness_code(invoice[j++].equals("")? null : invoice[j-1]);
                invObj.setCust_number(invoice[j++].equals("")? null : invoice[j-1]);
                invObj.setName_customer(invoice[j++].equals("")? null : invoice[j-1]);
                invObj.setClear_date(invoice[j++].equals("")? null : format_clearDate(invoice[j-1]));
                invObj.setBusiness_year(invoice[j++].equals("")? null : (int) parseDouble(invoice[j-1]));

                if (invoice[j].equals(""))
                    continue;

                invObj.setDoc_id(invoice[j++].equals("")? null : (long) parseDouble(invoice[j-1]));
                invObj.setPosting_date(invoice[j++].equals("")? null:format_postingDate(invoice[j-1]));
                invObj.setDocument_create_date(invoice[j++].equals("")? null:formatDate(invoice[j-1]));

                j++;

                invObj.setDue_in_date(invoice[j++].equals("")? null:formatDate(invoice[j-1]));
                invObj.setInvoice_currency(invoice[j++].equals("")? null : invoice[j-1]);
                invObj.setDocument_type(invoice[j++]);
                invObj.setPosting_id(invoice[j++].equals("")? null : (short) parseDouble(invoice[j-1]));
                invObj.setArea_business(invoice[j++].equals("")? null : invoice[j-1]);
                invObj.setTotal_open_amount(invoice[j++].equals("")? null : parseDouble(invoice[j-1]));
                invObj.setBaseline_create_date(invoice[j++].equals("")? null : formatDate(invoice[j-1]));
                invObj.setCust_payment_terms(invoice[j++].equals("")? null : invoice[j-1]);
                invObj.setInvoice_id(invoice[j++].equals("")? null : (long) parseDouble(invoice[j - 1]));
                invObj.setIsOpen(invoice[j].equals("")? null : (short) parseDouble(invoice[j]));



                pstmt.setString(1, invObj.getBusiness_code());
                pstmt.setString(2, invObj.getCust_number());
                pstmt.setString(3, invObj.getName_customer());
                pstmt.setDate(4, invObj.getClear_date());
                pstmt.setObject(5, invObj.getBusiness_year(), Types.INTEGER);
                pstmt.setObject(6, invObj.getDoc_id(), Types.BIGINT);
                pstmt.setDate(7, invObj.getPosting_date());
                pstmt.setDate(8, invObj.getDocument_create_date());
                pstmt.setDate(9, invObj.getDue_in_date());
                pstmt.setString(10, invObj.getInvoice_currency());
                pstmt.setString(11, invObj.getDocument_type());
                pstmt.setObject(12, invObj.getPosting_id(), Types.TINYINT);
                pstmt.setString(13, invObj.getArea_business());
                pstmt.setObject(14, invObj.getTotal_open_amount(), Types.DOUBLE);
                pstmt.setDate(15, invObj.getBaseline_create_date());
                pstmt.setString(16, invObj.getCust_payment_terms());
                pstmt.setObject(17, invObj.getInvoice_id(), Types.BIGINT);
                pstmt.setObject(18, invObj.getIsOpen(), Types.TINYINT);

                pstmt.addBatch();
                System.out.println("Batch " + (i-1) + " Added!");
            }

            System.out.println("Executing Batch on Database..... (This may take several minutes)");
            pstmt.executeBatch();
            System.out.println("Data successfully migrated to Database!");

            br.close();
        }
        catch (IOException ie)
        {
            ie.printStackTrace();
        } catch (SQLException se){
            se.printStackTrace();
        }
        catch (Exception e){
            e.printStackTrace();
        }
        finally {
            try {
                pstmt.close();
            }catch (SQLException se){
                se.printStackTrace();
            }
            db.closeConn();
        }
    }
}
