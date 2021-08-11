package com.higradius;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.Statement;
import java.text.SimpleDateFormat;
import java.util.ArrayList;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;

import dbMigration.DBConnection;

public class InvoiceDAO {

	static class EditDetails{
		private Long docID = null;
		private Double invoiceAmount = null;
		private String notes = null;
	}
	
	public static Connection getConnection(){  
        
		DBConnection db = new DBConnection();
		db.makeConn();
		Connection conn = db.getConn();  
          
        return conn;  
    }  

	public static Long add(String payLoad){  
        
		Long docID = null;  
        try{  
            Invoice inv = new Invoice();
        	Connection conn = getConnection();  
        	String sqlQuery = "INSERT INTO invoice_details (name_customer, cust_number, doc_id, total_open_amount, due_in_date, document_create_date, Notes)"
        			+ "			 VALUES (?, ?, ?, ?, ?, ?, ?)";
            PreparedStatement stmt = conn.prepareStatement(sqlQuery);  
            
            Gson gson = new GsonBuilder().setPrettyPrinting().create();
            inv = gson.fromJson(payLoad, Invoice.class);
            
            String date = inv.getDueDate();
            SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
            java.util.Date Date = sdf.parse(date);
            java.sql.Date dueDate = new java.sql.Date(Date.getTime());
            
            date = inv.getDocCreateDate();
            sdf = new SimpleDateFormat("dd-MM-yyyy");
            Date = sdf.parse(date);
            java.sql.Date docCreateDate = new java.sql.Date(Date.getTime());
            
            stmt.setString(1, inv.getCustName());
            stmt.setString(2, inv.getCustID());
            stmt.setLong(3, inv.getDocID());
            stmt.setDouble(4, inv.getInvoiceAmount());
            stmt.setDate(5, dueDate);
            stmt.setDate(6, docCreateDate);
            stmt.setString(7, inv.getNotes());
              
            int status = stmt.executeUpdate();  
            
            if (status != 0)
            	docID = inv.getDocID();
            
            conn.close();
            stmt.close();
            
        }catch(Exception e){e.printStackTrace();}  
          
        return docID;  
    }  
	
	public static Long edit(String payLoad){  
        Long docID = null;  
        try{
        	EditDetails details = new EditDetails();
            Connection conn = getConnection(); 
            String sqlQuery = "UPDATE invoice_details SET total_open_amount = ?, Notes = ? WHERE doc_id = ?";
            PreparedStatement stmt = conn.prepareStatement(sqlQuery);	
            
            Gson gson = new GsonBuilder().setPrettyPrinting().create();
        	details = gson.fromJson(payLoad, EditDetails.class);
            
        	stmt.setDouble(1, details.invoiceAmount);
        	stmt.setString(2, details.notes);
            stmt.setLong(3, details.docID);
     
            int status = stmt.executeUpdate();  
            
            if (status != 0)
            	docID = details.docID;
            	  
            conn.close(); 
            stmt.close();
            
        }catch(Exception e){e.printStackTrace();}  
          
        return docID;  
    }  

	public static int delete(Long docID){  
        int status = 0;  
        try{  
            Connection conn = getConnection();  
            String sqlQuery = "DELETE FROM invoice_details WHERE doc_id = ?";
            PreparedStatement stmt = conn.prepareStatement(sqlQuery);  
            
            stmt.setLong(1,docID);  
            status = stmt.executeUpdate();  
              
            conn.close();
            stmt.close();
            
        }catch(Exception e){e.printStackTrace();}  
          
        return status;  
	}  
	
	public static ArrayList<Invoice> infiniteScroll(Long searchValue, Integer count, Integer sortOrder, String orderBy){
		
		ArrayList<Invoice> invArr = new ArrayList<>();
		
		try {
			
			Connection conn = getConnection();
			Statement stmt = conn.createStatement(); 
			
			String sqlQuery = "";
			if (sortOrder == 0)
				sqlQuery = searchValue != null? "select * from invoice_details WHERE doc_id LIKE '" 
													+ searchValue + "%'" : "select * from invoice_details";
			else {
				if (sortOrder == 1) {
					String column = orderBy.equals("invoiceAmount")? "total_open_amount" : "due_in_date";
					String append = " ORDER BY "+ column +" ASC";
					sqlQuery = searchValue != null? "select * from invoice_details WHERE doc_id LIKE '" + searchValue + "%'" + append:
						                            "select * from invoice_details" + append;
				}
				
				else {
					String column = orderBy.equals("invoiceAmount")? "total_open_amount" : "due_in_date";
					String append = " ORDER BY "+ column +" DESC";
					sqlQuery = searchValue != null? "select * from invoice_details WHERE doc_id LIKE '" 
							+ searchValue + "%'" + append : "select * from invoice_details" + append;
				}
			}
			
	        ResultSet rs = stmt.executeQuery(sqlQuery);
	        
	        rs.absolute(count);
            int i=0;
            while(rs.next() && i<20) {
            	
            	Invoice inv = new Invoice();
            	
            	inv.setCustName(rs.getString("name_customer")); 
            	System.out.println(inv.getCustName());
            	inv.setCustID(rs.getString("cust_number")); 
            	inv.setDocID(rs.getLong("doc_id"));
            	inv.setInvoiceAmount(rs.getDouble("total_open_amount"));
            	inv.setDueDate(new SimpleDateFormat("dd-MMM-yyyy").format(rs.getDate("due_in_date")));
            	inv.setDocCreateDate(new SimpleDateFormat("dd-MMM-yyyy").format(rs.getDate("document_create_date")));
            	inv.setNotes(rs.getString("Notes"));
            	
                invArr.add(inv);
                
                i++;
            }
            
            conn.close();
            stmt.close();
            rs.close();
			
		}catch(Exception e) { e.printStackTrace(); }
		
		return invArr;
	}

	public static ArrayList<Invoice> getInvoice(Long docID){
		
		ArrayList<Invoice> invList = new ArrayList<Invoice>();
		
		try {
			
			Connection conn = getConnection();
			
			String sqlQuery = "SELECT * FROM invoice_details WHERE doc_id = ?";
			PreparedStatement stmt = conn.prepareStatement(sqlQuery);
			stmt.setLong(1, docID);
			
	        ResultSet rs = stmt.executeQuery();
	        rs.next();
	        Invoice inv = new Invoice();
        	
        	inv.setCustName(rs.getString("name_customer"));  
        	inv.setCustID(rs.getString("cust_number")); 
        	inv.setDocID(rs.getLong("doc_id"));
        	inv.setInvoiceAmount(rs.getDouble("total_open_amount"));
        	inv.setDueDate(new SimpleDateFormat("dd-MMM-yyyy").format(rs.getDate("due_in_date")));
        	inv.setDocCreateDate(new SimpleDateFormat("dd-MMM-yyyy").format(rs.getDate("document_create_date")));
        	inv.setNotes(rs.getString("Notes"));
        	
        	
            invList.add(inv);
            
            conn.close();
            stmt.close();
            rs.close();
			
		}catch(Exception e) { e.printStackTrace(); }
		
		return invList;
	}
	
 	public static String getJsonArray(ArrayList<Invoice> invList) {
		Gson gson = new GsonBuilder().create();
		
		JsonArray jarray = gson.toJsonTree(invList).getAsJsonArray();
        JsonObject jsonObject = new JsonObject();
        jsonObject.add("resData", jarray);

        return jsonObject.toString();
	}
}
