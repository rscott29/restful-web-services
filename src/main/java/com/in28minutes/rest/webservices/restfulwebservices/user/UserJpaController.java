package com.in28minutes.rest.webservices.restfulwebservices.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.hateoas.EntityModel;
import org.springframework.hateoas.server.mvc.WebMvcLinkBuilder;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.validation.Valid;
import java.net.URI;
import java.util.List;
import java.util.Optional;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.linkTo;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.methodOn;

@RestController
public class UserJpaController {


    private final UserRepository userRepository;
    private final PostRepository postRepository;

    @Autowired
    public UserJpaController(UserRepository userRepository, PostRepository postRepository) {

        this.userRepository = userRepository;
        this.postRepository = postRepository;
    }
    @CrossOrigin(origins = "http://localhost:4200")
    @GetMapping("/jpa/users")
    public List<User> retrieveAllUsers() {
        return userRepository.findAll();
    }

    @GetMapping("/jpa/users/{id}")
    public EntityModel<User> retrieveUser(@PathVariable int id) {
        final Optional<User> user = userRepository.findById(id);
        if (user.isEmpty())
            throw new UserNotFoundException("id-" + id);
        EntityModel<User> resource = new EntityModel<>(user.get());
        WebMvcLinkBuilder linkTo = linkTo(methodOn(this.getClass()).retrieveAllUsers());
        resource.add(linkTo.withRel("all-users"));
        return resource;
    }
    @CrossOrigin(origins = "http://localhost:4200", exposedHeaders = "Location")
    @DeleteMapping("/jpa/users/{id}")
    public void deleteUser(@PathVariable int id) {
        userRepository.deleteById(id);
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @PutMapping("/jpa/users/{id}")
    User updateUser(@RequestBody User newUser, @PathVariable Integer id) {

        return userRepository.findById(id)
                .map(user -> {
                    if (!newUser.getName().isEmpty()) {
                        user.setName(newUser.getName());
                    }
                    if (newUser.getBirthDate() != null) {
                        user.setBirthDate(newUser.getBirthDate());
                    }
                    return userRepository.save(user);
                })
                .orElseGet(() -> {
                    newUser.setId(id);
                    return userRepository.save(newUser);
                });
    }
    @CrossOrigin(origins = "http://localhost:4200", exposedHeaders = "Location")
    @PostMapping("/jpa/users")
    public User createUser(@Valid @RequestBody User user) {
        User savedUser = userRepository.save(user);
//        URI location = ServletUriComponentsBuilder
//                .fromCurrentRequest()
//                .path("/{id}")
//                .buildAndExpand(savedUser.getId()).toUri();

        return savedUser;
    }

    @GetMapping("/jpa/users/{id}/posts")
    public List<Post> retrieveAllPostById(@PathVariable int id) {
        final Optional<User> userOptional = userRepository.findById(id);
        if (userOptional.isEmpty()) {
            throw new UserNotFoundException("id- " + id);
        }
        return userOptional.get().getPosts();
    }

    @PostMapping("/jpa/users/{id}/posts")
    public ResponseEntity<Post> createPostById(@PathVariable int id, @RequestBody Post post) {
        final Optional<User> userOptional = userRepository.findById(id);
        if (userOptional.isEmpty()) {
            throw new UserNotFoundException("id- " + id);
        }
        User user = userOptional.get();
        post.setUser(user);
        postRepository.save(post);
        URI location = ServletUriComponentsBuilder
                .fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(post.getId()).toUri();

        return ResponseEntity.created(location).build();
    }
}
