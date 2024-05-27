
package org.springboot.backoffice1.Controller;

import org.hibernate.annotations.Parameter;
import org.springboot.backoffice1.model.User;
import org.springboot.backoffice1.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/User")
public class UserController {
    @Autowired
    private  UserService userService;
    @PostMapping("/Enregistrerfournisseur")
    public ResponseEntity<String> EnregistrerClient( @RequestBody Map<String, String> fournisseur) {
        String UserName = fournisseur.get("UserName");
        String PassWord = fournisseur.get("PassWord");
        String mobile = fournisseur.get("mobile");
        String ville = fournisseur.get("ville");
        int UserType= 2;
        User user = new User(UserName, PassWord,UserType, mobile, ville);
        if (UserName == null || PassWord == null || UserName.isEmpty() || PassWord.isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("{\"message\": \"remplir tous les champs\"}");
        }
        int resultat = userService.Ajouterfournisseur(user);
        if (resultat != 0) {
            return ResponseEntity.ok("{\"message\": \"vous avez été ajouté avec succès\"}");
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("{\"message\": \"réessayez plus tard\"}");
        }
    }

    @GetMapping("/Getfournisseur")
    public List<User> getAllfourisseur() {
        System.out.println("je suis appele 2");
        List<User> users = userService.findAllUser();
        for(User user:users){
            System.out.println(user.getUserId());
            System.out.println(user.getUserName());
            System.out.println(user.getVille());
        }
        return users;
    }
    @DeleteMapping("/SupprimerFournisseur/{userId}")
    public ResponseEntity<String> supprimerFournisseur(@PathVariable int userId) {
        boolean isDeleted = userService.deleteprofile(userId);
        if (isDeleted) {
            return ResponseEntity.ok("{\"message\": \"Fournisseur supprimé avec succès\"}");
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("{\"message\": \"Erreur lors de la suppression du fournisseur\"}");
        }
    }
    @PutMapping("/ModifierFournisseur/{userId}")
    public ResponseEntity<String> modifierFournisseur(@PathVariable int userId, @RequestBody Map<String, String> fournisseurData) {
        System.out.println("je suis appele 3");
        String userName = fournisseurData.get("userName");
        String ville = fournisseurData.get("ville");
        String mobile = fournisseurData.get("mobile");
        String categorie = fournisseurData.get("categorie");
        // Vérifiez si les données nécessaires sont présentes
        if (userName == null || ville == null || mobile == null || categorie == null || userName.isEmpty() || ville.isEmpty() || mobile.isEmpty() || categorie.isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("{\"message\": \"Tous les champs sont obligatoires pour la modification\"}");
        }
        // Mettez à jour le fournisseur
        boolean isUpdated = userService.updateUser(userId, userName, ville, mobile, categorie);
        if (isUpdated) {
            return ResponseEntity.ok("{\"message\": \"Fournisseur mis à jour avec succès\"}");
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("{\"message\": \"Erreur lors de la mise à jour du fournisseur\"}");
        }
    }
    @GetMapping("/Getdetailfournisseur")
    public List<User> getdetailfourisseur() {
        System.out.println("je suis appele 4");
        List<User> users = userService.findDetailsfournisseurs();
        for(User user:users){
            System.out.println(user.getUserId());
            System.out.println(user.getUserName());
            System.out.println(user.getVille());
            System.out.println(user.getDemandenattente());
            System.out.println(user.getDemandenattente());
        }
        return users;
    }

    @GetMapping("/GetClient")
    public List<User> getclinet() {
        System.out.println("je suis appele 5");
        List<User> users = userService.findClients();
        for(User user:users){
            System.out.println(user.getUserId());
            System.out.println(user.getUserName());
            System.out.println(user.getVille());
            System.out.println(user.getDemandenattente());
            System.out.println(user.getDemandenattente());
        }
        return users;
    }

    @GetMapping("/GetAvis")
    public List<User> getAvis() {
        System.out.println("je suis appele 6");
        List<User> users = userService.findAvisClient();
        for(User user:users){
            System.out.println(user.getUserId());
            System.out.println(user.getUserName());
            System.out.println(user.getVille());
            System.out.println(user.getAvis());

        }
        return users;
    }




}
