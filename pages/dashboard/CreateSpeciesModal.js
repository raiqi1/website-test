import React, { useState } from 'react'
import { Modal, Form, Input, Button, message, Spin } from 'antd'
import axios from 'axios'

const CreateSpeciesModal = ({ visible, onClose, onSpeciesCreated }) => {
  const [form] = Form.useForm()
  const token = localStorage.getItem('token') // Mendapatkan token dari localStorage
  const [loading, setLoading] = useState(false)

  const handleCreate = async () => {
    try {
      const values = await form.validateFields()
      setLoading(true)

      // Kirim data ke API untuk membuat species baru
      const response = await axios.post(
        'https://test.api.sahabatlautlestari.com/species',
        values,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Menambahkan token untuk autentikasi
          },
        },
      )

      message.success('Species berhasil dibuat!')
      onSpeciesCreated(response.data) // Tambahkan species baru ke data di komponen parent
      form.resetFields() // Reset form setelah berhasil submit
      onClose() // Tutup modal setelah sukses
    } catch (error) {
      message.error('Gagal membuat species baru!')
      console.log('Error: ', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Modal
      title="Create New Species"
      bodyStyle={{ maxHeight: '350px', overflowY: 'auto' }}
      visible={visible}
      onCancel={onClose}
      footer={[
        <Button key="cancel" onClick={onClose}>
          Cancel
        </Button>,
        <Button key="submit" type="primary" onClick={handleCreate}>
        <h1 className='text-black'>
          Create
        </h1>
        </Button>,
      ]}
    >
      <Spin spinning={loading}>
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
            rules={[
              { required: true, message: 'Please input Scientific Name' },
            ]}
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
            rules={[
              { required: true, message: 'Please input Indonesian Name' },
            ]}
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
            rules={[
              { required: true, message: 'Please input Status in Indonesia' },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="fishUtilization"
            label="Fish Utilization"
            rules={[
              { required: true, message: 'Please input Fish Utilization' },
            ]}
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
      </Spin>
    </Modal>
  )
}

export default CreateSpeciesModal
