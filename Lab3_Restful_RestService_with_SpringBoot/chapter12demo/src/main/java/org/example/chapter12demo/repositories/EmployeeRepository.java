package org.example.chapter12demo.repositories;

import org.example.chapter12demo.pojos.Employee;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Repository
public class EmployeeRepository implements IEmployeeRepository {

    private List<Employee> employees = createList();



    @Override
    public List<Employee> getAllEmployees() {
        return employees;
    }

}
