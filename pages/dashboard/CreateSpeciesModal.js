import React, { useState } from 'react'
import { Modal, Form, Input, message } from 'antd'
import axios from 'axios'

const CreateSpeciesModal = ({ visible, onClose, onCreateSuccess }) => {
  const [loading, setLoading] = useState(false)
  const [form] = Form.useForm()

  const handleCreate = async () => {
    try {
      const values = await form.validateFields()
      const token = localStorage.getItem('token')
      
      setLoading(true)

      // Mengirim permintaan create species ke server
      await axios.post('https://test.api.sahabatlautlestari.com/species', values, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      message.success('Species created successfully!')
      form.resetFields() // Mengosongkan form setelah berhasil
      onCreateSuccess() // Memanggil callback untuk merefresh data di tabel
      onClose() // Menutup modal
    } catch (error) {
      message.error('Failed to create species')
      console.error('Error creating species:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Modal
      title="Create New Species"
      visible={visible}
      onOk={handleCreate}
      onCancel={onClose}
      confirmLoading={loading}
      okText={<span style={{ color: 'black' }}>Create</span>}
      cancelText="Cancel"
      bodyStyle={{ maxHeight: '350px', overflowY: 'auto' }}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="faoCode"
          label="FAO Code"
          rules={[{ required: true, message: 'Please input FAO Code' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="typeOfFish"
          label="Type of Fish"
          rules={[{ required: true, message: 'Please input Type of Fish' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="scientificName"
          label="Scientific Name"
          rules={[{ required: true, message: 'Please input Scientific Name' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="englishName"
          label="English Name"
          rules={[{ required: true, message: 'Please input English Name' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="indonesianName"
          label="Indonesian Name"
          rules={[{ required: true, message: 'Please input Indonesian Name' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="localName"
          label="Local Name"
          rules={[{ required: true, message: 'Please input Local Name' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="typeOfWater"
          label="Type of Water"
          rules={[{ required: true, message: 'Please input Type of Water' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="statusInIndonesia"
          label="Status in Indonesia"
          rules={[{ required: true, message: 'Please input Status in Indonesia' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="fishUtilization"
          label="Fish Utilization"
          rules={[{ required: true, message: 'Please input Fish Utilization' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="imageUrl"
          label="Image URL"
          rules={[{ required: true, message: 'Please input Image URL' }]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default CreateSpeciesModal
