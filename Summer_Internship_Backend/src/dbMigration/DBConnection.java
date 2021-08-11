package dbMigration;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class DBConnection {
    private static final String JDBC_DRIVER = "com.mysql.cj.jdbc.Driver";
    private static final String DB_URL = "jdbc:mysql://localhost/h2h_internship";

    // Database credentials
    private static final String USER = "root";
    private static final String PASS = "Ferrari.458";

    private Connection conn;

    public Connection getConn() {
        return conn;
    }

    public void setConn(Connection conn) {
        this.conn = conn;
    }

    public void makeConn() {

        try{
            Class.forName(JDBC_DRIVER);
            Connection conn = DriverManager.getConnection(DB_URL, USER, PASS);

            System.out.println("Connection to Database established successfully!\n");
            setConn(conn);
        }catch (ClassNotFoundException ce){
            ce.printStackTrace();
        }
        catch (SQLException se){
            se.printStackTrace();
        }
    }

    public void closeConn(){
        try{
            conn.close();

            System.out.println("Connection closed! GoodBye.");
        } catch (SQLException se) {
            se.printStackTrace();
        }
    }
}
