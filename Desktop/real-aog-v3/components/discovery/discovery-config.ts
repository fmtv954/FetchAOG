export interface DiscoveryConfig {
  // Data Sources Configuration
  dataSources: {
    api: {
      endpoint: string
      method: 'GET' | 'POST'
      headers: Record<string, string>
      pollInterval: number // in minutes
    }[]
    database: {
      type: 'SQL' | 'NOSQL'
      connection: string
      tables: string[]
      syncInterval: number // in minutes
    }[]
  }

  // Discovery Triggers
  triggers: {
    patterns: {
      type: 'MAINTENANCE' | 'DELAY' | 'WEATHER'
      threshold: number
      timeWindow: number // in hours
    }[]
    anomalies: {
      metric: string
      sensitivity: number // 0 to 1
      baseline: number
    }[]
    correlations: {
      variables: string[]
      minCorrelation: number
      maxLag: number // in hours
    }[]
  }

  // Data Retention
  retention: {
    realTime: {
      days: 120
      granularity: 'MINUTE' | 'HOUR' | 'DAY'
    }
    discovery: {
      days: 365
      granularity: 'HOUR' | 'DAY' | 'WEEK'
    }
    archive: {
      enabled: boolean
      format: 'PARQUET' | 'CSV'
      compression: boolean
    }
  }

  // AI/ML Configuration
  ml: {
    models: {
      type: 'CLASSIFICATION' | 'REGRESSION' | 'CLUSTERING'
      algorithm: string
      parameters: Record<string, unknown>
    }[]
    training: {
      frequency: 'DAILY' | 'WEEKLY'
      validationSplit: number
      metrics: string[]
    }
  }
}

