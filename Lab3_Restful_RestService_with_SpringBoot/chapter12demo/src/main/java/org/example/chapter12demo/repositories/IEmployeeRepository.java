package org.example.chapter12demo.repositories;

import org.example.chapter12demo.pojos.Employee;
import org.springframework.data.repository.PagingAndSortingRepository;

import java.util.List;

public interface IEmployeeRepository extends PagingAndSortingRepository<Employee, String> {
    public Employee getEmployeeById(String empId);
    public Employee delete(int id);
    public Employee create(Employee user);
    public List<Employee> getAllEmployees();
}
