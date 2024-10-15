/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { Table, Button, Modal, Form, Input, message } from 'antd'
import axios from 'axios'
import Head from 'next/head'
import CreateSpeciesModal from './CreateSpeciesModal'

export default function SpeciesTable() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [currentRecord, setCurrentRecord] = useState(null) // Untuk menyimpan data yang akan di-update
  const [form] = Form.useForm() // Form instance untuk modal update
  const [pagination, setPagination] = useState({
    current: 1, // Halaman awal
    pageSize: 10, // Jumlah item per halaman
  })
  const [isCreateModalVisible, setIsCreateModalVisible] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'https://test.api.sahabatlautlestari.com/species/all',
        )
        setData(response.data)
        setLoading(false)
      } catch (error) {
        message.error('Failed to fetch data')
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  // Menampilkan modal update
  const showModal = (record) => {
    setCurrentRecord(record)
    form.setFieldsValue(record)
    setIsModalVisible(true)
  }

  const handleUpdate = async () => {
    try {
      const values = await form.validateFields()
      const token = localStorage.getItem('token')

      // Kirim permintaan update ke server
      const response = await axios.put(
        `https://test.api.sahabatlautlestari.com/species/${currentRecord.id}`,
        values,
        {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )

      console.log('response', response)

      // Update data di tabel setelah berhasil
      setData((prevData) =>
        prevData.map((item) =>
          item.id === currentRecord.id ? { ...item, ...values } : item,
        ),
      )
      setIsModalVisible(false)
      message.success('Data updated successfully')
    } catch (error) {
      message.error('Failed to update data')
      console.error('Error updating data:', error)
    }
  }

  const { confirm } = Modal // Menggunakan Modal.confirm untuk konfirmasi

  const handleDelete = (record) => {
    confirm({
      title: 'Apakah Anda yakin ingin menghapus data ini?',
      content: 'Tindakan ini tidak bisa dibatalkan',
      okText: 'Ya, Hapus',
      okType: 'danger',
      cancelText: 'Batal',
      onOk: async () => {
        try {
          const token = localStorage.getItem('token') // Mendapatkan token dari localStorage

          // Mengirim permintaan delete ke server
          await axios.delete(
            `https://test.api.sahabatlautlestari.com/species/${record.id}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            },
          )

          // Mengupdate data setelah berhasil menghapus
          setData((prevData) =>
            prevData.filter((item) => item.id !== record.id),
          )

          message.success('Data berhasil dihapus')
        } catch (error) {
          message.error('Gagal menghapus data')
          console.error('Error deleting data:', error)
        }
      },
      onCancel() {
        console.log('Hapus dibatalkan')
      },
    })
  }

  const columns = [
    {
      title: 'No',
      dataIndex: 'no',
      key: 'no',
      render: (text, record, index) =>
        (pagination.current - 1) * pagination.pageSize + index + 1,
    },
    {
      title: 'FAO Code',
      dataIndex: 'faoCode',
      key: 'faoCode',
    },
    {
      title: 'Type of Fish',
      dataIndex: 'typeOfFish',
      key: 'typeOfFish',
    },
    {
      title: 'Scientific Name',
      dataIndex: 'scientificName',
      key: 'scientificName',
    },
    {
      title: 'English Name',
      dataIndex: 'englishName',
      key: 'englishName',
    },
    {
      title: 'Indonesian Name',
      dataIndex: 'indonesianName',
      key: 'indonesianName',
    },
    {
      title: 'Local Name',
      dataIndex: 'localName',
      key: 'localName',
    },
    {
      title: 'Type of Water',
      dataIndex: 'typeOfWater',
      key: 'typeOfWater',
    },
    {
      title: 'Status in Indonesia',
      dataIndex: 'statusInIndonesia',
      key: 'statusInIndonesia',
    },
    {
      title: 'Fish Utilization',
      dataIndex: 'fishUtilization',
      key: 'fishUtilization',
    },
    {
      title: 'Image',
      dataIndex: 'imageUrl',
      key: 'imageUrl',
      render: (text) => <img src={text} alt="Fish" style={{ width: 100 }} />,
    },
    {
      title: 'Aksi',
      key: 'action',
      render: (text, record) => (
        <>
          <Button
            type="primary"
            onClick={() => showModal(record)}
            style={{ marginRight: 8, color: 'black' }}
          >
            Update
          </Button>
          <Button
            type="danger"
            onClick={() => handleDelete(record)}
            style={{
              backgroundColor: '#ff4d4f',
              color: '#fff',
              borderColor: '#ff4d4f',
              transition: 'background-color 0.3s ease',
              marginTop: '1vw',
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = '#ff7875')
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = '#ff4d4f')
            }
          >
            Delete
          </Button>
        </>
      ),
    },
  ]

  const handleTableChange = (newPagination) => {
    setPagination(newPagination) // Update pagination saat user berpindah halaman
  }

  // Fungsi untuk menambahkan species baru di posisi paling atas
  const handleSpeciesCreated = (newSpecies) => {
    setData((prevData) => [newSpecies, ...prevData]) // Tambahkan di urutan pertama
  }

  return (
    <div style={{ padding: '20px' }}>
      <Head>
        <title>Dashboard Admin</title>
      </Head>
      <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>
        Dashboard Admin
      </h1>
      <Button
        type="primary"
        style={{ marginBottom: '20px', backgroundColor: '#52c41a' }}
        onClick={() => setIsCreateModalVisible(true)}
      >
        <h1 className="text-black ">Create Species</h1>
      </Button>
      <div style={{ maxWidth: '90%', margin: '0 auto' }}>
        {data.length > 0 ? (
          <Table
            columns={columns}
            dataSource={data}
            rowKey="faoCode"
            scroll={{ x: 1000, y: 400 }} // Scroll horizontal dan vertikal
            pagination={pagination} // Menyambungkan pagination ke Table
            onChange={handleTableChange} // Fungsi untuk mengupdate pagination
          />
        ) : (
          <p>No data available</p>
        )}
      </div>

      {/* Modal untuk update */}
      <Modal
        title="Update Data"
        visible={isModalVisible}
        onOk={handleUpdate}
        onCancel={() => setIsModalVisible(false)}
        okText={<span style={{ color: 'black' }}>Update</span>}
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
      </Modal>
      <CreateSpeciesModal
        visible={isCreateModalVisible}
        onClose={() => setIsCreateModalVisible(false)}
        onSpeciesCreated={handleSpeciesCreated} // Pass function to handle new species
      />
    </div>
  )
}
