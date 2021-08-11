package com.higradius;

import java.io.IOException;
import java.io.PrintWriter;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;

@WebServlet(asyncSupported = true, name = "DeleteInvoice", urlPatterns = {"/delete"})
public class DeleteInvoice extends HttpServlet{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	protected void doDelete(HttpServletRequest req, HttpServletResponse res) throws IOException, ServletException {
		
    	PrintWriter out = res.getWriter();	
		Long docID = Long.parseLong(req.getParameter("docID"));

		int state = InvoiceDAO.delete(docID);
		
		boolean status = state==1? true:false;
		String json = "[{\"docID\": " + docID + ",\"isDeleted\": " + status + "}]";
		
		JsonArray jarray = new JsonParser().parse(json).getAsJsonArray();
        JsonObject jsonObject = new JsonObject();
        jsonObject.add("resData", jarray);

        String Output = jsonObject.toString();
        res.setContentType("application/json");
        res.setCharacterEncoding("UTF-8");
        out.print(Output);
        
	}
}
