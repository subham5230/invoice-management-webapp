package com.higradius;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet(asyncSupported = true, name = "AddInvoice", urlPatterns = {"/add"})

public class AddInvoice extends HttpServlet{

	private static final long serialVersionUID = 1L;
	
	protected void doPost(HttpServletRequest req, HttpServletResponse res) throws IOException, ServletException {
    	
		String url = req.getRequestURL().toString();
		String serverName = req.getServerName();
        int portNumber = req.getServerPort();
        String servletPath = req.getServletPath();
		System.out.println("Request FROM:");
		System.out.println("Server NAME: " + serverName + ", PORT: " + portNumber + ", METHOD: POST");
		System.out.println("Servlet PATH: " + servletPath);
		System.out.println("URL: " + url);
		
	    StringBuilder stringBuilder = new StringBuilder();
		
		BufferedReader inputStream = req.getReader();
        if (inputStream != null) {
            BufferedReader bufferedReader = new BufferedReader(inputStream);
            char[] charBuffer = new char[128];
            int bytesRead = -1;
            while ((bytesRead = bufferedReader.read(charBuffer)) > 0) {
                stringBuilder.append(charBuffer, 0, bytesRead);
            }
        } else {
            stringBuilder.append("");
        }
    	
        String body = stringBuilder.toString();
    	
        Long docID = InvoiceDAO.add(body);
        System.out.println(docID);
    	PrintWriter out = res.getWriter();
    	ArrayList <Invoice> arr = new ArrayList<>();
    	
    	if (docID != null)
    		arr = InvoiceDAO.getInvoice(docID);
    
    	
        String Response = InvoiceDAO.getJsonArray(arr);
        res.setContentType("application/json");
        res.setCharacterEncoding("UTF-8");
        out.print(Response);
 
    	
    }
}
