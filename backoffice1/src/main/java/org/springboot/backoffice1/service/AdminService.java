package org.springboot.backoffice1.service;

import org.springboot.backoffice1.model.Admin;
import org.springboot.backoffice1.model.User;
import org.springframework.stereotype.Service;

import java.sql.*;

@Service
public class AdminService {

    public Connection connexion(){
        Connection conn= null ;
        try {

            conn = DriverManager.getConnection("jdbc:mysql://localhost/mobapp","root","");

        } catch (SQLException e) {
            System.out.println(e.toString());

        }
        return conn;}
     // authentification admin
    public Admin selectioneradmin(String username, String password) {
        Connection conn = connexion();
        try (PreparedStatement statement = conn.prepareStatement("SELECT * FROM admins WHERE username = ? AND password = ?")){
            statement.setString(1, username);
            statement.setString(2, password);
            ResultSet resultSet = statement.executeQuery();
            if (resultSet.next()) {
                Admin admin= new Admin();
                admin.setId(resultSet.getInt("id"));
                admin.setUsername(resultSet.getString("username"));
                admin.setPassword(resultSet.getString("password"));
                return admin;
            } else {
                return null;
            }
        }
        catch (Exception e) {
            System.out.println(e.toString());
            System.out.println("probleme 0 admin");
            return null;
        }
    }
}
