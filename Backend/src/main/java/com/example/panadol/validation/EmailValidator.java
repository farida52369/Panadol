package com.example.panadol.validation;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class EmailValidator implements ConstraintValidator<ValidEmail, String> {

    // Allows (A-Z) (a-z) (0-9) (-+._)
    // Exclude . to be at the beginning or end of the email or to be repeated .. (\\.)
    // Length of like (com) must be >= 2
    private final String EMAIL_PATTERN = "^[A-Za-z0-9-+_]+(\\.[A-Za-z0-9-_]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$";
    private final Pattern PATTERN = Pattern.compile(EMAIL_PATTERN);

    @Override
    public boolean isValid(final String value, ConstraintValidatorContext context) {
        return validateEmail(value);
    }

    private boolean validateEmail(final String email) {
        Matcher matcher = PATTERN.matcher(email);
        return matcher.matches();
    }
}
