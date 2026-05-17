'use client'
import { useEffect, useState } from 'react'
import { Phone, Sms, WhatsApp, Check, Archive, Search, Filter, Schedule, CheckCircle, PhoneForwarded, Close } from '@mui/icons-material'
import { supabase } from '@/lib/supabase'
import { Loader } from '@/components/loader'
import styles from './EnquiryDashboard.module.css'

interface Quote {
  id: string
  name: string
  phone: string
  service: string
  source: string
  status: 'pending' | 'contacted' | 'completed' | 'archived'
  created_at: string
}

const QuoteDashboard = () => {
  const [quotes, setQuotes] = useState<Quote[]>([])
  const [loading, setLoading] = useState(true)
  const [activeFilter, setActiveFilter] = useState<'all' | 'pending' | 'contacted' | 'completed' | 'archived'>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedQuote, setSelectedQuote] = useState<Quote | null>(null)

  useEffect(() => {
    fetchQuotes()
  }, [])

  const fetchQuotes = async () => {
    try {
      const { data, error } = await supabase
        .from('quotes')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setQuotes(data || [])
    } catch (error) {
      console.error('Error fetching quotes:', error)
    } finally {
      setLoading(false)
    }
  }

  const updateQuoteStatus = async (id: string, status: Quote['status']) => {
    try {
      const { error } = await supabase
        .from('quotes')
        .update({ status })
        .eq('id', id)

      if (error) throw error

      setQuotes(quotes.map(quote =>
        quote.id === id ? { ...quote, status } : quote
      ))
    } catch (error) {
      console.error('Error updating quote:', error)
    }
  }

  const getStatusIcon = (status: Quote['status']) => {
    switch (status) {
      case 'pending': return <Schedule className={styles.pendingIcon} />
      case 'contacted': return <PhoneForwarded className={styles.contactedIcon} />
      case 'completed': return <CheckCircle className={styles.completedIcon} />
      default: return null
    }
  }

  const filteredQuotes = quotes.filter(quote => {
    const matchesFilter = activeFilter === 'all' || quote.status === activeFilter
    const matchesSearch =
      quote.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      quote.phone.toLowerCase().includes(searchQuery.toLowerCase()) ||
      quote.service.toLowerCase().includes(searchQuery.toLowerCase())

    return matchesFilter && matchesSearch
  })

  return (
    <div className={styles.dashboard}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1>Quote Requests</h1>
          <div className={styles.stats}>
            {['pending', 'contacted', 'completed', 'archived'].map((status) => (
              <div key={status} className={styles.statItem}>
                {getStatusIcon(status as Quote['status'])}
                <span>{status.charAt(0).toUpperCase() + status.slice(1)}:</span>
                <span className={styles.statNumber}>
                  {quotes.filter(q => q.status === status).length}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.controls}>
          <div className={styles.search}>
            <Search />
            <input
              type="text"
              placeholder="Search quotes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className={styles.filters}>
            <Filter />
            {['all', 'pending', 'contacted', 'completed', 'archived'].map((filter) => (
              <button
                key={filter}
                className={`${styles.filterButton} ${activeFilter === filter ? styles.active : ''}`}
                onClick={() => setActiveFilter(filter as typeof activeFilter)}
              >
                {filter.charAt(0).toUpperCase() + filter.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div className={styles.content}>
          {loading ? (
            <Loader
              message="Loading quotes..."
              type="bars"
              size="default"
            />
          ) : filteredQuotes.length === 0 ? (
            <div className={styles.empty}>
              <Search sx={{ fontSize: 40 }} />
              <p>No quotes found</p>
            </div>
          ) : (
            <div className={styles.tableContainer}>
              <table className={styles.quotesTable}>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Phone</th>
                    <th>Service</th>
                    <th>Source</th>
                    <th>Status</th>
                    <th>Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredQuotes.map((quote) => (
                    <tr key={quote.id} className={`${styles.quoteRow} ${styles[quote.status]}`}>
                      <td className={styles.nameCell}>{quote.name}</td>
                      <td className={styles.phoneCell}>{quote.phone}</td>
                      <td className={styles.serviceCell}>{quote.service}</td>
                      <td className={styles.sourceCell}>
                        {quote.source}
                      </td>
                      <td className={styles.statusCell}>
                        <span className={`${styles.statusBadge} ${styles[quote.status]}`}>
                          {getStatusIcon(quote.status)}
                          <span>{quote.status}</span>
                        </span>
                      </td>
                      <td className={styles.dateCell}>
                        {new Date(quote.created_at).toLocaleDateString()}
                      </td>
                      <td className={styles.actionsCell}>
                        <div className={styles.actionButtons}>
                          <a
                            href={`tel:${quote.phone}`}
                            className={styles.actionButton}
                            title="Call"
                          >
                            <Phone />
                          </a>
                          <a
                            href={`sms:${quote.phone}`}
                            className={styles.actionButton}
                            title="Send SMS"
                          >
                            <Sms />
                          </a>
                          <a
                            href={`https://wa.me/91${quote.phone.replace(/[^0-9]/g, '').slice(-10)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.actionButton}
                            title="WhatsApp"
                          >
                            <WhatsApp />
                          </a>
                          <select
                            value={quote.status}
                            onChange={(e) => updateQuoteStatus(quote.id, e.target.value as Quote['status'])}
                            className={styles.statusSelect}
                          >
                            <option value="pending">Pending</option>
                            <option value="contacted">Contacted</option>
                            <option value="completed">Completed</option>
                          </select>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>


      {selectedQuote && (
        <div
          className={styles.modal}
          onClick={() => setSelectedQuote(null)}
        >
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className={styles.closeModal}
              onClick={() => setSelectedQuote(null)}
            >
              <Close />
            </button>
            <h2>Quote Request Details</h2>
            <div className={styles.modalMeta}>
              <div className={styles.metaItem}>
                <strong>Name:</strong> {selectedQuote.name}
              </div>
              <div className={styles.metaItem}>
                <strong>Phone:</strong> {selectedQuote.phone}
              </div>
              <div className={styles.metaItem}>
                <strong>Service:</strong> {selectedQuote.service}
              </div>
              <div className={styles.metaItem}>
                <strong>Status:</strong>
                <span className={`${styles.statusBadge} ${styles[selectedQuote.status]}`}>
                  {getStatusIcon(selectedQuote.status)}
                  {selectedQuote.status}
                </span>
              </div>
              <div className={styles.metaItem}>
                <strong>Requested on:</strong>
                {new Date(selectedQuote.created_at).toLocaleString()}
              </div>
            </div>
            <div className={styles.modalActions}>
              <div className={styles.modalActionGroup}>
                <label className={styles.modalLabel}>Update Status:</label>
                <select
                  value={selectedQuote.status}
                  onChange={(e) => updateQuoteStatus(selectedQuote.id, e.target.value as Quote['status'])}
                  className={styles.modalStatusSelect}
                >
                  <option value="pending">Pending</option>
                  <option value="contacted">Contacted</option>
                  <option value="completed">Completed</option>
                  <option value="archived">Archived</option>
                </select>
              </div>
              <div className={styles.modalActionGroup}>
                <label className={styles.modalLabel}>Quick Actions:</label>
                <div className={styles.modalQuickActions}>
                  <a
                    href={`tel:${selectedQuote.phone}`}
                    className={styles.actionButtonLarge}
                  >
                    <Phone /> Call
                  </a>
                  <a
                    href={`sms:${selectedQuote.phone}`}
                    className={styles.actionButtonLarge}
                  >
                    <Sms /> SMS
                  </a>
                  <a
                    href={`https://wa.me/91${selectedQuote.phone.replace(/[^0-9]/g, '').slice(-10)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.actionButtonLarge}
                  >
                    <WhatsApp /> WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}

export default QuoteDashboard