package com.example.service;

import java.util.Optional;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.model.Account;
import com.example.repository.AccountRepository;

@Service
public class AccountService {
    private final AccountRepository accountRepository;
    private final PasswordEncoder passwordEncoder;

    public AccountService(AccountRepository accountRepository, PasswordEncoder passwordEncoder) {
        this.accountRepository = accountRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public Account createAccount(Account account){
        Optional<Account> existAccount = accountRepository.findByEmail(account.getEmail());
        if(existAccount.isPresent()){
            throw new IllegalArgumentException("This account already exists");
        }
        // Mã hóa password
        account.setPassword(passwordEncoder.encode(account.getPassword()));

        return accountRepository.save(account);
    }

    public Boolean checkLogin(String identifier, String password){
        // Thử tìm theo email trước, nếu không thấy thì tìm theo username
        Optional<Account> accountOpt = accountRepository.findByEmail(identifier);
        
        if (accountOpt.isEmpty()) {
            accountOpt = accountRepository.findByUsername(identifier);
        }

        return accountOpt
                .map(account -> passwordEncoder.matches(password, account.getPassword()))
                .orElse(false);
    }

}
