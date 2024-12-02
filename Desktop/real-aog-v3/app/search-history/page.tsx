"use client"

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { getSearchHistory, SearchData } from '@/utils/searchHistory'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function SearchHistory() {
  const [history, setHistory] = useState<SearchData[]>([])
  const router = useRouter()

  useEffect(() => {
    setHistory(getSearchHistory())
  }, [])

  const handleViewDetails = (search: SearchData) => {
    router.push(`/aog-results?id=${search.id}`)
  }

  return (
    <Card className="w-full max-w-4xl mx-auto mt-8">
      <CardHeader>
        <CardTitle>Search History</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Tail Number</TableHead>
              <TableHead>Flight Date</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Part Number</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {history.map((search) => (
              <TableRow key={search.id}>
                <TableCell>{new Date(search.timestamp).toLocaleString()}</TableCell>
                <TableCell>{search.tailNumber}</TableCell>
                <TableCell>{search.flightDate}</TableCell>
                <TableCell>{search.location || 'N/A'}</TableCell>
                <TableCell>{search.partNumber || 'N/A'}</TableCell>
                <TableCell>
                  <Button onClick={() => handleViewDetails(search)}>View Details</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

