package org.springboot.backoffice1.service;

import org.springboot.backoffice1.model.User;
import org.springframework.stereotype.Service;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

@Service
public class UserService {

    public Connection connexion(){
        Connection conn= null ;
        try {

            conn = DriverManager.getConnection("jdbc:mysql://localhost/mobapp","root","");

        } catch (SQLException e) {
            System.out.println(e.toString());

        }
        return conn;}

    public int Ajouterfournisseur(User C){
        Connection conn = connexion();
        int resultat= 0;
        try {
            PreparedStatement statement = conn.prepareStatement("INSERT INTO usertable (UserName,PassWord,mobile,ville,UserType) VALUES (?,?,?,?,?)") ;
            statement.setString(1,C.getUserName());
            statement.setString(2,C.getPassWord());
            statement.setString(3,C.getMobile());
            statement.setString(4,C.getVille());
            statement.setInt(5,C.getUserType());

            resultat= statement.executeUpdate();

        }
        catch (Exception E){
            System.out.println(E.toString());
            System.out.println("probleme 1 user");
        }
        return resultat;
    }

    public List<User> findAllUser() {
        List<User> users = new ArrayList<>();
        Connection conn = connexion();
        String select = "SELECT  DISTINCT U.UserId, U.UserName,U.mobile,U.ville, S.categorie " +
                "FROM usertable U " +
                "INNER JOIN service S ON U.UserId = S.idfournisseur " ;
        try (PreparedStatement statement = conn.prepareStatement(select)) {
            ResultSet resultSet = statement.executeQuery();
            while (resultSet.next()) {
                User user = new User();
               user.setUserId(resultSet.getInt("UserId"));
               user.setUserName(resultSet.getString("UserName"));
               user.setMobile(resultSet.getString("mobile"));
               user.setVille(resultSet.getString("ville"));
               user.setCategorie(resultSet.getString("categorie"));

                users.add(user);
            }
        } catch (Exception e) {
            System.out.println(e.toString());
            System.out.println("probleme 1 users ");
        }
        return users;
    }

    public boolean deleteprofile(int UserId ) {
        try {
            Connection conn = connexion();
            PreparedStatement delete= conn.prepareStatement("DELETE from usertable where UserId=?");
            delete.setInt(1, UserId);
            int resultat = delete.executeUpdate();
            return resultat>0;
        }catch(Exception E) {
            System.out.println(E.toString());
            System.out.println("probleme 2 users");
            return false;
        }
    }
    public boolean updateUser(int userId, String userName, String ville, String mobile, String categorie) {
        try {
            Connection conn = connexion();
            PreparedStatement update = conn.prepareStatement("UPDATE usertable SET UserName=?, ville=?, mobile=? WHERE UserId=?");
            update.setString(1, userName);
            update.setString(2, ville);
            update.setString(3, mobile);
            update.setInt(4, userId);
            int result = update.executeUpdate();

            // Mettre à jour la catégorie dans la table service
            PreparedStatement updateCategorie = conn.prepareStatement("UPDATE service SET categorie=? WHERE idfournisseur=?");
            updateCategorie.setString(1, categorie);
            updateCategorie.setInt(2, userId);
            int resultCategorie = updateCategorie.executeUpdate();

            // Si les deux mises à jour réussissent, retournez true
            return result > 0 && resultCategorie > 0;
        } catch (Exception e) {
            System.out.println(e.toString());
            System.out.println("probleme 3 users");
            return false;
        }
    }

    public List<User> findDetailsfournisseurs() {
        List<User> users = new ArrayList<>();
        Connection conn = connexion();
        String select = "SELECT U.UserId, U.UserName, U.mobile, U.ville, " +
                "COALESCE(DemandesAttente.demandes_en_attente, 0) AS demandes_en_attente, " +
                "COALESCE(DemandesTerminees.demandes_terminees, 0) AS demandes_terminees, " +
                "COALESCE(Services.total_service, 0) AS total_service " +
                "FROM usertable U " +
                "LEFT JOIN ( " +
                "    SELECT D.IdFournisseur, COUNT(D.IdDemande) AS demandes_en_attente " +
                "    FROM Demande D " +
                "    WHERE D.status = 'en-attente' " +
                "    GROUP BY D.IdFournisseur " +
                ") DemandesAttente ON U.UserId = DemandesAttente.IdFournisseur " +
                "LEFT JOIN ( " +
                "    SELECT D.IdFournisseur, COUNT(D.IdDemande) AS demandes_terminees " +
                "    FROM Demande D " +
                "    WHERE D.status = 'termine' " +
                "    GROUP BY D.IdFournisseur " +
                ") DemandesTerminees ON U.UserId = DemandesTerminees.IdFournisseur " +
                "LEFT JOIN ( " +
                "    SELECT S.idfournisseur, COUNT(DISTINCT S.ServiceId) AS total_service " +
                "    FROM Service S " +
                "    GROUP BY S.idfournisseur " +
                ") Services ON U.UserId = Services.idfournisseur " +
                "GROUP BY U.UserId, U.UserName, U.mobile, U.ville";

        try (PreparedStatement statement = conn.prepareStatement(select)) {
            ResultSet resultSet = statement.executeQuery();

            while (resultSet.next()) {
                // Créer un nouvel utilisateur
                User user = new User();
                user.setUserId(resultSet.getInt("UserId"));
                user.setUserName(resultSet.getString("UserName"));
                user.setMobile(resultSet.getString("mobile"));
                user.setVille(resultSet.getString("ville"));
                user.setDemandenattente(resultSet.getInt("demandes_en_attente")); // Nombre de demandes en attente
                user.setDemandetermine(resultSet.getInt("demandes_terminees")); // Nombre de demandes terminées
                user.setNombreservice(resultSet.getInt("total_service")); // Nombre total de services
                users.add(user);
            }

        } catch (Exception e) {
            System.out.println(e.toString());
            System.out.println("Problème lors de la récupération des fournisseurs");
        }
        return users;
    }


    public List<User> findClients() {
        List<User> users = new ArrayList<>();
        Connection conn = connexion();
        String select = "SELECT U.UserId, U.UserName, U.mobile, U.ville, U.email, U.adress, " +
                "COUNT(D.IdDemande) AS total_demandes " + // Utilisation de COUNT pour compter les demandes par client
                "FROM usertable U " +
                "INNER JOIN Demande D ON U.UserId = D.IdClient " + // Utilisation d'une INNER JOIN pour inclure uniquement les clients avec des demandes
                "GROUP BY U.UserId, U.UserName, U.mobile, U.ville, U.email, U.adress"; // Regroupement par client

        try {
            PreparedStatement statement = conn.prepareStatement(select);
            ResultSet resultSet = statement.executeQuery();

            while (resultSet.next()) {
                // Créer un nouvel utilisateur
                User user = new User();
                user.setUserId(resultSet.getInt("UserId"));
                user.setUserName(resultSet.getString("UserName"));
                user.setMobile(resultSet.getString("mobile"));
                user.setVille(resultSet.getString("ville"));
                user.setAdress(resultSet.getString("adress"));
                user.setEmail(resultSet.getString("email"));
                user.setTotalDemandes(resultSet.getInt("total_demandes")); // Définition du nombre total de demandes

                users.add(user);
            }

        } catch (Exception e) {
            System.out.println(e.toString());
            System.out.println("Problème lors de la récupération des clients");
        }
        return users;
    }

    public List<User> findAvisClient() {
        List<User> users = new ArrayList<>();
        Connection conn = connexion();
        String select = "SELECT U.UserId, U.UserName,U.mobile,U.ville, A.commentaire" +
                "FROM usertable U "+
                "INNER JOIN avis A ON U.UserId = A.UserId " ;
        try (PreparedStatement statement = conn.prepareStatement(select)) {
            ResultSet resultSet = statement.executeQuery();
            while (resultSet.next()) {
                User user = new User();
                user.setUserId(resultSet.getInt("UserId"));
                user.setUserName(resultSet.getString("UserName"));
                user.setMobile(resultSet.getString("mobile"));
                user.setVille(resultSet.getString("ville"));
                user.setAvis(resultSet.getString("commentaire"));

                users.add(user);
            }
        } catch (Exception e) {
            System.out.println("probleme ici user6");
        }
        return users;
    }




}
