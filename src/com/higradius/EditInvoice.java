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

@WebServlet(asyncSupported = true, name = "EditInvoice", urlPatterns = {"/edit"})
public class EditInvoice extends HttpServlet{

	private static final long serialVersionUID = 1L;

	@Override
	protected void doPut(HttpServletRequest req, HttpServletResponse res) throws IOException, ServletException {

    	PrintWriter out = res.getWriter();
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

        Long docID = InvoiceDAO.edit(body);
        ArrayList<Invoice> inv = new ArrayList<>();
        
        if (docID != null)
        	inv = InvoiceDAO.getInvoice(docID);
   
        
        String Response = InvoiceDAO.getJsonArray(inv);
        res.setContentType("application/json");
        res.setCharacterEncoding("UTF-8");
        out.print(Response);

    }
}
