'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { withAuth } from '@/lib/withAuth'
import styles from './tasks.module.css'

function TasksPage() {
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all') // all, pending, completed
  const [sortBy, setSortBy] = useState('dueDate')
  const [completed, setCompleted] = useState({})

  useEffect(() => {
    fetchTasks()
  }, [])

  const fetchTasks = async () => {
    try {
      const res = await fetch('/api/tasks')
      const data = await res.json()
      setTasks(data.tasks || [])
    } catch (error) {
      console.error('Error fetching tasks:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleTaskComplete = async (taskId, isCompleted) => {
    setCompleted({ ...completed, [taskId]: isCompleted })
    try {
      await fetch(`/api/tasks/${taskId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: isCompleted ? 'completed' : 'open' }),
      })
    } catch (error) {
      console.error('Error updating task:', error)
    }
  }

  // Filter tasks
  let filteredTasks = tasks.filter(task => {
    if (filter === 'pending') return task.status === 'open'
    if (filter === 'completed') return task.status === 'completed'
    return true
  })

  // Sort tasks
  filteredTasks = [...filteredTasks].sort((a, b) => {
    if (sortBy === 'dueDate') {
      return new Date(a.dueDate) - new Date(b.dueDate)
    }
    return 0
  })

  const pendingCount = tasks.filter(t => t.status === 'open').length
  const completedCount = tasks.filter(t => t.status === 'completed').length
  const highPriorityCount = tasks.filter(t => t.priority === 'High').length

  if (loading) return <div className={styles.container}>Loading...</div>

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <div>
          <h1>Tasks & Follow-ups</h1>
          <p className={styles.subtitle}>Manage donor engagement and administrative tasks</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <div>
            <div className={styles.statLabel}>Pending Tasks</div>
            <div className={styles.statValue}>{pendingCount}</div>
          </div>
          <div className={styles.statIcon}>⏱</div>
        </div>
        <div className={styles.statCard}>
          <div>
            <div className={styles.statLabel}>Completed</div>
            <div className={styles.statValue}>{completedCount}</div>
          </div>
          <div className={styles.statIcon}>✓</div>
        </div>
        <div className={styles.statCard}>
          <div>
            <div className={styles.statLabel}>High Priority</div>
            <div className={styles.statValue}>{highPriorityCount}</div>
          </div>
          <div className={styles.statIcon}>!</div>
        </div>
      </div>

      {/* Filters and Sort */}
      <div className={styles.controlsSection}>
        <div className={styles.filterButtons}>
          <button
            className={`${styles.filterBtn} ${filter === 'all' ? styles.active : ''}`}
            onClick={() => setFilter('all')}
          >
            All Tasks
          </button>
          <button
            className={`${styles.filterBtn} ${filter === 'pending' ? styles.active : ''}`}
            onClick={() => setFilter('pending')}
          >
            Pending
          </button>
          <button
            className={`${styles.filterBtn} ${filter === 'completed' ? styles.active : ''}`}
            onClick={() => setFilter('completed')}
          >
            Completed
          </button>
        </div>

        <div className={styles.sortSection}>
          <label>Sort by:</label>
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className={styles.sortSelect}>
            <option value="dueDate">Due Date</option>
            <option value="priority">Priority</option>
          </select>
        </div>
      </div>

      {/* Tasks List */}
      <div className={styles.tasksList}>
        {filteredTasks.length === 0 ? (
          <p className={styles.emptyMessage}>No tasks found</p>
        ) : (
          filteredTasks.map(task => (
            <div key={task.id} className={`${styles.taskItem} ${completed[task.id] ? styles.completed : ''}`}>
              <input
                type="checkbox"
                checked={completed[task.id] || task.status === 'completed'}
                onChange={(e) => handleTaskComplete(task.id, e.target.checked)}
                className={styles.checkbox}
              />

              <div className={styles.taskContent}>
                <div className={styles.taskTitle}>
                  {task.title}
                  {task.donationId && ` (donation)`}
                </div>
                <div className={styles.taskMeta}>
                  <span className={styles.dueDate}>📅 {new Date(task.dueDate).toLocaleDateString()}</span>
                  <span className={`${styles.taskType} ${styles[`type_${task.taskType?.toLowerCase()}`]}`}>
                    {task.taskType?.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
                  </span>
                </div>
              </div>

              <div className={styles.taskRight}>
                <span className={`${styles.priority} ${styles[`priority_${task.priority?.toLowerCase()}`]}`}>
                  {task.priority}
                </span>
                {task.donorId && (
                  <Link href={`/donors/${task.donorId}`} className={styles.viewLink}>
                    View Donor
                  </Link>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default withAuth(TasksPage)
