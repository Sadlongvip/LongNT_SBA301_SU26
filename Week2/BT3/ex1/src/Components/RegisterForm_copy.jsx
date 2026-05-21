//BÀI 2 — Elementary: Form Đăng Ký
//Mục tiêu:Quản lý nhiều state trong một form, validate dữ liệu, hiển thị thông báo lỗi.
//Kiến thức:`useState` với Object, controlled components, validation.
//Form đăng ký gồm: Họ tên, Email, Mật khẩu, Xác nhận mật khẩu. 
// Validate trước khi submit và hiển thị thông báo thành công.
import { useState } from 'react'
import { Form } from 'react-bootstrap'
import { Button } from 'react-bootstrap'
import { Container, Row, Col } from 'react-bootstrap'
function RegistrationForm() {
    const [formData, setFormData] = useState({ // State để lưu dữ liệu form
        fullName: '',
        email: '',
        password: '',
        confirmPassword: ''
    })
    const [errors, setErrors] = useState({}) // State để lưu lỗi validation
    const handleChange = (e) => { // Cập nhật state khi người dùng nhập dữ liệu
        setFormData({
            ...formData, // Giữ nguyên các giá trị khác trong formData
            [e.target.name]: e.target.value // Cập nhật giá trị của trường đang thay đổi
        })
    }
    const validate = () => { // Hàm validate dữ liệu
        const newErrors = {}
        if (!formData.fullName) newErrors.fullName = 'Full name is required'
        if (!formData.email) {
            newErrors.email = 'Email is required'
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email is invalid'
        }
        if (!formData.password) {
            newErrors.password = 'Password is required'
        } else if (formData.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters'
        }
        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match'
        }
        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }
    const handleSubmit = (e) => { // Xử lý submit form
        e.preventDefault() // Ngăn chặn reload trang
        if (validate()) { // Nếu dữ liệu hợp lệ, hiển thị thông báo thành công
            alert('Registration successful!')
            setFormData({ // Reset form sau khi submit thành công
                fullName: '',
                email: '',
                password: '',
                confirmPassword: ''
            })
        }
    }
    //handle Cancel button để reset form về trạng thái ban đầu
    const handleCancel = () => {
        setFormData({
            fullName: '',
            email: '',
            password: '',
            confirmPassword: ''
        })
        setErrors({})
    }

    return (
        <>
            {/*Hiển thị Container, Row, Colum 5 hàng, 3 cột */}
            <Container>
                <Row>
                    <Col><h2>Registration Form</h2></Col>
                </Row>
                <Row>
                    <Col>
                        {/* Form đăng ký */}

                        <Form onSubmit={handleSubmit} style={{ maxWidth: '400px', margin: '0 auto' }}>
                            <Form.Group className="mb-3" controlId="formFullName">
                                <Form.Label>Full Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="fullName"
                                    value={formData.fullName}
                                    onChange={handleChange}
                                    isInvalid={!!errors.fullName}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.fullName}
                                </Form.Control.Feedback>
                            </Form.Group>
                            {/* Similar form groups for email, password, and confirmPassword */}
                            <Form.Group className="mb-3" controlId="formEmail">
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    isInvalid={!!errors.email}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.email}
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    isInvalid={!!errors.password}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.password}
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formConfirmPassword">
                                <Form.Label>Confirm Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    isInvalid={!!errors.confirmPassword}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.confirmPassword}
                                </Form.Control.Feedback>
                            </Form.Group>
                            {/* Form group cho button Submit and Cancel, dùng Button React-Bootstrap */}
                            <Form.Group className="mb-3">
                                <Button variant="primary" type="submit" style={{ width: '100%' }}>
                                    Register
                                </Button>
                                <Button variant="secondary" type="button" style={{ width: '100%', marginTop: '10px' }} onClick={handleCancel}>
                                    Cancel
                                </Button>

                            </Form.Group>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </>
    )
}
export default RegistrationForm