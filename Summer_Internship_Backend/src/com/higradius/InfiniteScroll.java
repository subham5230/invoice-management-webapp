package com.higradius;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.text.SimpleDateFormat;  
import java.util.Date;

@WebServlet(asyncSupported = true, name = "InfiniteScroll", urlPatterns = {"/scroll"})
public class InfiniteScroll extends HttpServlet {
	
			public static boolean isNumeric(String str) { 
				  try {  
				    Long.parseLong(str);  
				    return true;
				  } catch(NumberFormatException e){  
				    return false;  
				  }  
				}
	
	private static final long serialVersionUID = 1L;

	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse res) throws IOException, ServletException {

			String url = req.getRequestURL().toString();
			String serverName = req.getServerName();
		    int portNumber = req.getServerPort();
		    String servletPath = req.getServletPath();
		    SimpleDateFormat formatter = new SimpleDateFormat("dd/MMM/yyyy HH:mm:ss");
		    Date date = new Date();
		    
			System.out.println("Request at Timestamp: " + formatter.format(date) + " FOR:");
			System.out.println("Server NAME: " + serverName + ", PORT: " + portNumber + ", METHOD: GET");
			System.out.println("Servlet PATH: " + servletPath);
			System.out.println("URL: " + url);
		
    		ArrayList <Invoice> arr = new ArrayList<>();
    	
    		Long searchVal = null;
    		
    		if (req.getParameter("searchVal") != "")
    			searchVal = isNumeric(req.getParameter("searchVal"))? Long.parseLong(req.getParameter("searchVal")) : 1000000007;
    			
            int count = Integer.parseInt(req.getParameter("count"));
            int sortOrder = Integer.parseInt(req.getParameter("sortOrder"));
            String sortBy = req.getParameter("sortBy");
            
            System.out.println(sortBy + "   " + sortOrder);
            arr = InvoiceDAO.infiniteScroll(searchVal, count, sortOrder, sortBy);
           
            PrintWriter out = res.getWriter();
            String Response = InvoiceDAO.getJsonArray(arr);
            res.setContentType("application/json");
            res.setCharacterEncoding("UTF-8");
            out.print(Response);
    }

}
