package com.scottTech.rest.webservices.userservice.security;

public class JwtProperties {
    //TODO: Store these in a more secure location!
    public static final String SECRET = "SomeSecretForJWTGeneration";
    public static final int EXPIRATION_TIME = 864_000_000; // 10 days
    public static final String TOKEN_PREFIX = "Bearer ";
    public static final String HEADER_STRING = "Authorization";
}
