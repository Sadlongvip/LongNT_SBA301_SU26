// Bài 2: BÀI 2 — Elementary: Form Đăng Ký

// > **Mục tiêu:** Quản lý nhiều state trong một form, validate dữ liệu, hiển thị thông báo lỗi.**Kiến thức:** `useState` với Object, controlled components, validation.
// ### Yêu cầu
// Form đăng ký gồm: Họ tên, Email, Mật khẩu, Xác nhận mật khẩu. Validate trước khi submit và hiển thị thông báo thành công.
import React from 'react'
import { useState } from 'react'
import { Form, Button, Alert, Container, Row, Col } from 'react-bootstrap'

function RegisterForm() {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
        confirmPassword: ''
    })

    const [errors, setErrors] = useState({})
    const [showSuccess, setShowSuccess] = useState(false)

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData({
            ...formData,
            [name]: value
        })
        // Xóa error của field khi user nhập lại
        if (errors[name]) {
            setErrors({
                ...errors,
                [name]: ''
            })
        }
    }

    const validateForm = () => {
        let newErrors = {}

        if (!formData.fullName.trim()) {
            newErrors.fullName = 'Họ tên không được để trống'
        }

        if (!formData.email.trim()) {
            newErrors.email = 'Email không được để trống'
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email không hợp lệ'
        }

        if (!formData.password) {
            newErrors.password = 'Mật khẩu không được để trống'
        } else if (formData.password.length < 6) {
            newErrors.password = 'Mật khẩu phải có ít nhất 6 ký tự'
        }

        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Xác nhận mật khẩu không khớp'
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (validateForm()) {
            setShowSuccess(true)
            // Reset form after successful submission
            setFormData({
                fullName: '',
                email: '',
                password: '',
                confirmPassword: ''
            })
        }
    }
    const handleCancel = () => {
        setFormData({
            fullName: '',
            email: '',
            password: '',
            confirmPassword: ''
        })
        setErrors({})
        setShowSuccess(false)
    }

    

    return (
        <>        
            <Container>
                <h2>Đăng Ký</h2>
                {showSuccess && (
                    <Alert variant="success">
                        Đăng ký thành công!
                    </Alert>
                )}
                <Row>
                    <Col>
                        <Form onSubmit={handleSubmit} className="mt-3" style={{ maxWidth: '400px', margin: '0 auto' }}>
                            <Form.Group controlId="fullName" className="mb-3">
                                <Form.Label>Họ tên</Form.Label>
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

                            <Form.Group controlId="email" className="mb-3">
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    isInvalid={!!errors.email}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.email}
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group controlId="password" className="mb-3">
                                <Form.Label>Mật khẩu</Form.Label>
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

                            <Form.Group controlId="confirmPassword" className="mb-3">
                                <Form.Label>Xác nhận mật khẩu</Form.Label>
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
                            <Form.Group className="mb-3" controlId="formButtons">
                                <Button variant="primary" type="submit" style={{ width: '100%' }}>
                                    Đăng Ký
                                </Button>
                                <Button variant="secondary" onClick={handleCancel} className="ml-2" style={{ width: '100%', marginTop: '10px' }}>
                                    Hủy
                                </Button>
                            </Form.Group>
                                
                            

                        </Form>
                    </Col>
                </Row>

            </Container>
        </>

    )
}

export default RegisterForm