"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Search,
  Filter,
  TrendingUp,
  TrendingDown,
  AlertCircle,
  CheckCircle,
  Beaker,
  FileText,
  BarChart3,
} from "lucide-react"

// Mock data structure based on your LabCollector LIMS description
const mockLabData = [
  {
    sample_label: "ASYRUP-005",
    batch_lot_no: "ASYRUP-005",
    sample_type: "Stability Sample",
    sample_type_id: "3",
    comments: "Initial stability testing - Antacid Syrup formulation",
    lc_id: "LC001234",
    unique_code: "UC-2024-001",
    process_type: "Assay",
    analysis_date: "2024-01-15",
    assay_result_percent: 98.5,
    purity_result_percent: 99.2,
    dissolved_15min_percent: 85.3,
    qc_status: "Pass",
    specification_range: "95.0-105.0%",
    test_method: "HPLC-UV",
  },
  {
    sample_label: "ST-AntacidSyrup-T1M-002",
    batch_lot_no: "ASYRUP-006",
    sample_type: "Stability Sample",
    sample_type_id: "3",
    comments: "1-month stability checkpoint - Antacid Syrup",
    lc_id: "LC001235",
    unique_code: "UC-2024-002",
    process_type: "Dissolution",
    analysis_date: "2024-01-16",
    assay_result_percent: 97.8,
    purity_result_percent: 98.9,
    dissolved_15min_percent: 82.1,
    qc_status: "Pass",
    specification_range: "≥80% in 15min",
    test_method: "USP Apparatus II",
  },
  {
    sample_label: "ST-AntacidSyrup-T3M-003",
    batch_lot_no: "ASYRUP-007",
    sample_type: "Stability Sample",
    sample_type_id: "3",
    comments: "3-month stability checkpoint - Critical assessment",
    lc_id: "LC001236",
    unique_code: "UC-2024-003",
    process_type: "Assay",
    analysis_date: "2024-01-17",
    assay_result_percent: 96.2,
    purity_result_percent: 98.1,
    dissolved_15min_percent: 79.8,
    qc_status: "Pass",
    specification_range: "95.0-105.0%",
    test_method: "HPLC-UV",
  },
  {
    sample_label: "ST-AntacidSyrup-T1M-004",
    batch_lot_no: "ASYRUP-008",
    sample_type: "Stability Sample",
    sample_type_id: "3",
    comments: "1-month stability - Accelerated conditions 40°C/75% RH",
    lc_id: "LC001237",
    unique_code: "UC-2024-004",
    process_type: "Purity",
    analysis_date: "2024-01-18",
    assay_result_percent: 98.1,
    purity_result_percent: 97.8,
    dissolved_15min_percent: "N/A",
    qc_status: "Pass",
    specification_range: "≥98.0%",
    test_method: "HPLC-PDA",
  },
  {
    sample_label: "ST-AntacidSyrup-T1M-005",
    batch_lot_no: "ASYRUP-009",
    sample_type: "Stability Sample",
    sample_type_id: "3",
    comments: "1-month stability - Long term conditions 25°C/60% RH",
    lc_id: "LC001238",
    unique_code: "UC-2024-005",
    process_type: "Assay",
    analysis_date: "2024-01-19",
    assay_result_percent: 99.2,
    purity_result_percent: 99.1,
    dissolved_15min_percent: 84.5,
    qc_status: "Pass",
    specification_range: "95.0-105.0%",
    test_method: "HPLC-UV",
  },
  {
    sample_label: "ST-AntacidSyrup-T1M-006",
    batch_lot_no: "ASYRUP-010",
    sample_type: "Stability Sample",
    sample_type_id: "3",
    comments: "1-month stability - Intermediate conditions 30°C/65% RH",
    lc_id: "LC001239",
    unique_code: "UC-2024-006",
    process_type: "Dissolution",
    analysis_date: "2024-01-20",
    assay_result_percent: 97.5,
    purity_result_percent: 98.3,
    dissolved_15min_percent: 81.2,
    qc_status: "Pass",
    specification_range: "≥80% in 15min",
    test_method: "USP Apparatus II",
  },
  {
    sample_label: "ST-AntacidSyrup-T1M-007",
    batch_lot_no: "ASYRUP-011",
    sample_type: "Stability Sample",
    sample_type_id: "3",
    comments: "1-month stability - Photostability study ICH Q1B",
    lc_id: "LC001240",
    unique_code: "UC-2024-007",
    process_type: "Assay",
    analysis_date: "2024-01-21",
    assay_result_percent: 96.8,
    purity_result_percent: 97.9,
    dissolved_15min_percent: 83.1,
    qc_status: "Pass",
    specification_range: "95.0-105.0%",
    test_method: "HPLC-UV",
  },
  {
    sample_label: "ST-AntacidSyrup-T1M-008",
    batch_lot_no: "ASYRUP-012",
    sample_type: "Stability Sample",
    sample_type_id: "3",
    comments: "1-month stability - Freeze-thaw cycle testing",
    lc_id: "LC001241",
    unique_code: "UC-2024-008",
    process_type: "Physical Properties",
    analysis_date: "2024-01-22",
    assay_result_percent: 98.3,
    purity_result_percent: 98.7,
    dissolved_15min_percent: "N/A",
    qc_status: "Pass",
    specification_range: "Visual inspection",
    test_method: "USP <1151>",
  },
  {
    sample_label: "ST-AntacidSyrup-T1M-009",
    batch_lot_no: "ASYRUP-013",
    sample_type: "Stability Sample",
    sample_type_id: "3",
    comments: "1-month stability - Container closure integrity",
    lc_id: "LC001242",
    unique_code: "UC-2024-009",
    process_type: "Microbial Limits",
    analysis_date: "2024-01-23",
    assay_result_percent: "N/A",
    purity_result_percent: "N/A",
    dissolved_15min_percent: "N/A",
    qc_status: "Pass",
    specification_range: "<10 CFU/mL",
    test_method: "USP <61>",
  },
  {
    sample_label: "ST-AntacidSyrup-T0M-010",
    batch_lot_no: "ASYRUP-014",
    sample_type: "Stability Sample",
    sample_type_id: "3",
    comments: "Initial time point - Comprehensive characterization",
    lc_id: "LC001243",
    unique_code: "UC-2024-010",
    process_type: "Assay",
    analysis_date: "2024-01-24",
    assay_result_percent: 100.1,
    purity_result_percent: 99.5,
    dissolved_15min_percent: 86.2,
    qc_status: "Pass",
    specification_range: "95.0-105.0%",
    test_method: "HPLC-UV",
  },
  {
    sample_label: "RM-CitricAcid-001",
    batch_lot_no: "CA-2024-001",
    sample_type: "Raw Material",
    sample_type_id: "4",
    comments: "Incoming raw material - Citric acid monohydrate USP grade",
    lc_id: "LC001244",
    unique_code: "UC-2024-011",
    process_type: "Identity",
    analysis_date: "2024-01-25",
    assay_result_percent: 99.8,
    purity_result_percent: 99.9,
    dissolved_15min_percent: "N/A",
    qc_status: "Pass",
    specification_range: "99.5-100.5%",
    test_method: "IR Spectroscopy",
  },
  {
    sample_label: "RM-SodiumBicarb-002",
    batch_lot_no: "SB-2024-002",
    sample_type: "Raw Material",
    sample_type_id: "4",
    comments: "Incoming raw material - Sodium bicarbonate pharmaceutical grade",
    lc_id: "LC001245",
    unique_code: "UC-2024-012",
    process_type: "Assay",
    analysis_date: "2024-01-26",
    assay_result_percent: 99.2,
    purity_result_percent: 99.7,
    dissolved_15min_percent: "N/A",
    qc_status: "Pass",
    specification_range: "99.0-100.5%",
    test_method: "Titrimetric",
  },
  {
    sample_label: "FP-AntacidSyrup-001",
    batch_lot_no: "FP-AS-001",
    sample_type: "Finished Product",
    sample_type_id: "5",
    comments: "Final product release testing - Commercial batch",
    lc_id: "LC001246",
    unique_code: "UC-2024-013",
    process_type: "Assay",
    analysis_date: "2024-01-27",
    assay_result_percent: 98.7,
    purity_result_percent: 99.1,
    dissolved_15min_percent: 83.8,
    qc_status: "Pass",
    specification_range: "95.0-105.0%",
    test_method: "HPLC-UV",
  },
  {
    sample_label: "FP-AntacidTablet-002",
    batch_lot_no: "FP-AT-002",
    sample_type: "Finished Product",
    sample_type_id: "5",
    comments: "Final product release testing - Tablet formulation",
    lc_id: "LC001247",
    unique_code: "UC-2024-014",
    process_type: "Dissolution",
    analysis_date: "2024-01-28",
    assay_result_percent: 97.8,
    purity_result_percent: 98.9,
    dissolved_15min_percent: 78.2,
    qc_status: "Fail",
    specification_range: "≥80% in 15min",
    test_method: "USP Apparatus II",
  },
  {
    sample_label: "FP-GelAntacid-003",
    batch_lot_no: "FP-GA-003",
    sample_type: "Finished Product",
    sample_type_id: "5",
    comments: "Final product release testing - Gel formulation",
    lc_id: "-",
    unique_code: "No LC ID",
    process_type: "N/A",
    analysis_date: "N/A",
    assay_result_percent: "N/A",
    purity_result_percent: "N/A",
    dissolved_15min_percent: "N/A",
    qc_status: "Pending",
    specification_range: "N/A",
    test_method: "N/A",
  },
]

const sampleTypes = [
  {
    id: "3",
    name: "Stability Sample",
    description: "Samples tested over time to determine shelf life and storage conditions",
  },
  { id: "4", name: "Raw Material", description: "Incoming materials tested before use in manufacturing" },
  { id: "5", name: "Finished Product", description: "Final products tested before release to market" },
]

const qcTests = [
  {
    name: "Assay (Potency)",
    description:
      "Quantitative analysis to determine the active pharmaceutical ingredient (API) content using validated analytical methods. This test ensures the drug product contains the correct amount of active ingredient as labeled.",
    criteria: "95.0% - 105.0% of labeled amount (USP/ICH guidelines)",
    method: "High Performance Liquid Chromatography (HPLC-UV/PDA)",
    frequency: "Every batch, stability studies",
    regulatory: "FDA 21 CFR 211.194, ICH Q6A",
  },
  {
    name: "Dissolution Testing",
    description:
      "In-vitro test that measures the rate and extent of drug release from solid dosage forms. Critical for predicting in-vivo bioavailability and ensuring consistent therapeutic performance.",
    criteria: "≥80% dissolved in 15 minutes (immediate release), ≥85% in 45 minutes (extended release)",
    method: "USP Apparatus I (Basket) or II (Paddle), 37°C ± 0.5°C",
    frequency: "Every batch, method validation, stability",
    regulatory: "USP <711>, FDA Guidance on Dissolution",
  },
  {
    name: "Identity Testing",
    description:
      "Qualitative analysis to confirm the identity of the drug substance and excipients. Ensures the correct materials are used and detects potential mix-ups or contamination.",
    criteria: "Spectrum/chromatogram matches reference standard (correlation ≥0.99)",
    method: "IR Spectroscopy, HPLC retention time, UV spectroscopy",
    frequency: "Every incoming material, finished product",
    regulatory: "USP <197>, ICH Q6A identity tests",
  },
  {
    name: "Purity & Related Substances",
    description:
      "Quantitative determination of impurities, degradation products, and related substances. Critical for patient safety and product stability assessment.",
    criteria: "≥98.0% purity, individual impurities <0.5%, total impurities <2.0%",
    method: "HPLC with photodiode array detection (PDA), gradient elution",
    frequency: "Every batch, stability studies, method validation",
    regulatory: "ICH Q3A/Q3B, USP <621> chromatography",
  },
  {
    name: "Microbial Limits",
    description:
      "Enumeration of viable aerobic microorganisms and tests for specified microorganisms. Ensures product safety and compliance with pharmacopeial standards.",
    criteria: "TAMC: <10³ CFU/g, TYMC: <10² CFU/g, absence of specified pathogens",
    method: "Membrane filtration, plate count methods per USP <61>",
    frequency: "Every batch (non-sterile products), environmental monitoring",
    regulatory: "USP <61>, <62>, ICH Q4B microbiology",
  },
  {
    name: "Physical Properties",
    description:
      "Assessment of physical characteristics including appearance, color, odor, pH, viscosity, and other relevant physical parameters that affect product quality and performance.",
    criteria: "Meets established specifications for appearance, pH 6.0-8.0, viscosity 100-500 cP",
    method: "Visual inspection, pH meter, viscometer, USP <1151>",
    frequency: "Every batch, stability studies",
    regulatory: "USP General Chapters, ICH Q6A",
  },
]

export default function PharmaLabDashboard() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState("all")
  const [filterStatus, setFilterStatus] = useState("all")
  const [sortField, setSortField] = useState("analysis_date")
  const [sortDirection, setSortDirection] = useState("desc")

  // Calculate summary statistics
  const summaryStats = useMemo(() => {
    const totalSamples = mockLabData.length
    const totalProcesses = mockLabData.filter((item) => item.process_type !== "N/A").length
    const passingSamples = mockLabData.filter((item) => item.qc_status === "Pass").length
    const failingSamples = mockLabData.filter((item) => item.qc_status === "Fail").length
    const pendingSamples = mockLabData.filter((item) => item.qc_status === "Pending").length

    return {
      totalSamples,
      totalProcesses,
      passingSamples,
      failingSamples,
      pendingSamples,
      passRate: totalProcesses > 0 ? ((passingSamples / (passingSamples + failingSamples)) * 100).toFixed(1) : "0",
    }
  }, [])

  // Filter and sort data
  const filteredData = useMemo(() => {
    const filtered = mockLabData.filter((item) => {
      const matchesSearch =
        item.sample_label.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.sample_type.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.process_type.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.comments.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesType = filterType === "all" || item.sample_type_id === filterType
      const matchesStatus = filterStatus === "all" || item.qc_status === filterStatus

      return matchesSearch && matchesType && matchesStatus
    })

    // Sort data
    filtered.sort((a, b) => {
      let aVal = a[sortField as keyof typeof a]
      let bVal = b[sortField as keyof typeof b]

      // Handle numeric values
      if (typeof aVal === "number" && typeof bVal === "number") {
        return sortDirection === "asc" ? aVal - bVal : bVal - aVal
      }

      // Handle string values
      aVal = String(aVal).toLowerCase()
      bVal = String(bVal).toLowerCase()

      if (sortDirection === "asc") {
        return aVal < bVal ? -1 : aVal > bVal ? 1 : 0
      } else {
        return aVal > bVal ? -1 : aVal < bVal ? 1 : 0
      }
    })

    return filtered
  }, [searchTerm, filterType, filterStatus, sortField, sortDirection])

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("asc")
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Pass":
        return (
          <Badge className="bg-green-100 text-green-800 border-green-200">
            <CheckCircle className="w-3 h-3 mr-1" />
            Pass
          </Badge>
        )
      case "Fail":
        return (
          <Badge className="bg-red-100 text-red-800 border-red-200">
            <AlertCircle className="w-3 h-3 mr-1" />
            Fail
          </Badge>
        )
      case "Pending":
        return (
          <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">
            <AlertCircle className="w-3 h-3 mr-1" />
            Pending
          </Badge>
        )
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Enhanced Header with more visual appeal */}
        <div className="text-center space-y-4 py-8">
          <div className="inline-flex items-center justify-center gap-4 bg-white/80 backdrop-blur-sm px-8 py-4 rounded-2xl shadow-lg border border-white/20">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-3 rounded-xl">
              <Beaker className="w-10 h-10 text-white" />
            </div>
            <div className="text-left">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Pharma Lab Data Dashboard
              </h1>
              <p className="text-lg text-gray-600">
                LabCollector LIMS Integration - 27 Test Samples Quality Control Analytics
              </p>
            </div>
          </div>
          <div className="flex items-center justify-center gap-6 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>Real-time Data</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span>FDA Compliant</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <span>ICH Guidelines</span>
            </div>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <Card className="bg-white shadow-lg border-0">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Total Samples</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{summaryStats.totalSamples}</div>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-lg border-0">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Processed</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-indigo-600">{summaryStats.totalProcesses}</div>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-lg border-0">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-1">
                <TrendingUp className="w-4 h-4" />
                Passing QC
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{summaryStats.passingSamples}</div>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-lg border-0">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-1">
                <TrendingDown className="w-4 h-4" />
                Failing QC
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{summaryStats.failingSamples}</div>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-lg border-0">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Pass Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600">{summaryStats.passRate}%</div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="data" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3 bg-white shadow-sm">
            <TabsTrigger value="data" className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              Lab Data
            </TabsTrigger>
            <TabsTrigger value="samples" className="flex items-center gap-2">
              <Beaker className="w-4 h-4" />
              Sample Types
            </TabsTrigger>
            <TabsTrigger value="tests" className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              QC Tests
            </TabsTrigger>
          </TabsList>

          <TabsContent value="data" className="space-y-4">
            {/* Search and Filter Controls */}
            <Card className="bg-white shadow-lg border-0">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Filter className="w-5 h-5" />
                  Search & Filter Controls
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search samples, types, processes..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>

                  <Select value={filterType} onValueChange={setFilterType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Filter by Sample Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Sample Types</SelectItem>
                      <SelectItem value="3">Stability Sample</SelectItem>
                      <SelectItem value="4">Raw Material</SelectItem>
                      <SelectItem value="5">Finished Product</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={filterStatus} onValueChange={setFilterStatus}>
                    <SelectTrigger>
                      <SelectValue placeholder="Filter by QC Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Statuses</SelectItem>
                      <SelectItem value="Pass">Pass</SelectItem>
                      <SelectItem value="Fail">Fail</SelectItem>
                      <SelectItem value="Pending">Pending</SelectItem>
                    </SelectContent>
                  </Select>

                  <Button
                    variant="outline"
                    onClick={() => {
                      setSearchTerm("")
                      setFilterType("all")
                      setFilterStatus("all")
                    }}
                    className="bg-white text-gray-700 border-gray-300"
                  >
                    Clear Filters
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Data Table */}
            <Card className="bg-white shadow-lg border-0">
              <CardHeader>
                <CardTitle>Lab Data Records ({filteredData.length} entries)</CardTitle>
                <CardDescription>Combined sample and process data from LabCollector LIMS</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead
                          className="cursor-pointer hover:bg-gray-50"
                          onClick={() => handleSort("sample_label")}
                        >
                          Sample Label {sortField === "sample_label" && (sortDirection === "asc" ? "↑" : "↓")}
                        </TableHead>
                        <TableHead
                          className="cursor-pointer hover:bg-gray-50"
                          onClick={() => handleSort("batch_lot_no")}
                        >
                          Batch/Lot No. {sortField === "batch_lot_no" && (sortDirection === "asc" ? "↑" : "↓")}
                        </TableHead>
                        <TableHead
                          className="cursor-pointer hover:bg-gray-50"
                          onClick={() => handleSort("sample_type")}
                        >
                          Sample Type {sortField === "sample_type" && (sortDirection === "asc" ? "↑" : "↓")}
                        </TableHead>
                        <TableHead
                          className="cursor-pointer hover:bg-gray-50"
                          onClick={() => handleSort("process_type")}
                        >
                          Process Type {sortField === "process_type" && (sortDirection === "asc" ? "↑" : "↓")}
                        </TableHead>
                        <TableHead
                          className="cursor-pointer hover:bg-gray-50"
                          onClick={() => handleSort("analysis_date")}
                        >
                          Analysis Date {sortField === "analysis_date" && (sortDirection === "asc" ? "↑" : "↓")}
                        </TableHead>
                        <TableHead
                          className="cursor-pointer hover:bg-gray-50"
                          onClick={() => handleSort("assay_result_percent")}
                        >
                          Assay (%) {sortField === "assay_result_percent" && (sortDirection === "asc" ? "↑" : "↓")}
                        </TableHead>
                        <TableHead
                          className="cursor-pointer hover:bg-gray-50"
                          onClick={() => handleSort("purity_result_percent")}
                        >
                          Purity (%) {sortField === "purity_result_percent" && (sortDirection === "asc" ? "↑" : "↓")}
                        </TableHead>
                        <TableHead
                          className="cursor-pointer hover:bg-gray-50"
                          onClick={() => handleSort("dissolved_15min_percent")}
                        >
                          Dissolved 15min (%){" "}
                          {sortField === "dissolved_15min_percent" && (sortDirection === "asc" ? "↑" : "↓")}
                        </TableHead>
                        <TableHead className="cursor-pointer hover:bg-gray-50" onClick={() => handleSort("qc_status")}>
                          QC Status {sortField === "qc_status" && (sortDirection === "asc" ? "↑" : "↓")}
                        </TableHead>
                        <TableHead
                          className="cursor-pointer hover:bg-gray-50"
                          onClick={() => handleSort("specification_range")}
                        >
                          Specification {sortField === "specification_range" && (sortDirection === "asc" ? "↑" : "↓")}
                        </TableHead>
                        <TableHead
                          className="cursor-pointer hover:bg-gray-50"
                          onClick={() => handleSort("test_method")}
                        >
                          Test Method {sortField === "test_method" && (sortDirection === "asc" ? "↑" : "↓")}
                        </TableHead>
                        <TableHead>LC ID</TableHead>
                        <TableHead>Comments</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredData.map((item, index) => (
                        <TableRow key={index} className="hover:bg-gray-50">
                          <TableCell className="font-medium">{item.sample_label}</TableCell>
                          <TableCell>
                            <code className="text-xs bg-blue-50 px-2 py-1 rounded font-medium text-blue-800">
                              {item.batch_lot_no}
                            </code>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                              {item.sample_type}
                            </Badge>
                          </TableCell>
                          <TableCell>{item.process_type}</TableCell>
                          <TableCell>{item.analysis_date}</TableCell>
                          <TableCell className="text-right">
                            {typeof item.assay_result_percent === "number"
                              ? item.assay_result_percent.toFixed(1)
                              : item.assay_result_percent}
                          </TableCell>
                          <TableCell className="text-right">
                            {typeof item.purity_result_percent === "number"
                              ? item.purity_result_percent.toFixed(1)
                              : item.purity_result_percent}
                          </TableCell>
                          <TableCell className="text-right">
                            {typeof item.dissolved_15min_percent === "number"
                              ? item.dissolved_15min_percent.toFixed(1)
                              : item.dissolved_15min_percent}
                          </TableCell>
                          <TableCell>{getStatusBadge(item.qc_status)}</TableCell>
                          <TableCell className="text-sm text-gray-600">{item.specification_range}</TableCell>
                          <TableCell>
                            <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200 text-xs">
                              {item.test_method}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <code className="text-xs bg-gray-100 px-2 py-1 rounded">{item.lc_id}</code>
                          </TableCell>
                          <TableCell className="max-w-xs truncate" title={item.comments}>
                            {item.comments}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="samples" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {sampleTypes.map((type) => (
                <Card key={type.id} className="bg-white shadow-lg border-0">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                        ID: {type.id}
                      </Badge>
                      {type.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">{type.description}</p>
                    <div className="mt-4">
                      <div className="text-sm text-gray-500">
                        Samples in dataset: {mockLabData.filter((item) => item.sample_type_id === type.id).length}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="tests" className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Quality Control Test Methods & Specifications</h2>
              <p className="text-lg text-gray-600 max-w-4xl mx-auto">
                Comprehensive overview of analytical methods used in pharmaceutical quality control, following USP, ICH,
                and FDA guidelines. Each test ensures product safety, efficacy, and regulatory compliance throughout the
                product lifecycle.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {qcTests.map((test, index) => (
                <Card
                  key={index}
                  className="bg-white shadow-lg border-0 hover:shadow-xl transition-shadow duration-300"
                >
                  <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-t-lg">
                    <CardTitle className="flex items-center gap-3 text-xl">
                      <div className="bg-white/20 p-2 rounded-full">
                        <Beaker className="w-6 h-6" />
                      </div>
                      {test.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4 p-6">
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                        <FileText className="w-4 h-4 text-blue-600" />
                        Description:
                      </h4>
                      <p className="text-gray-600 leading-relaxed">{test.description}</p>
                    </div>

                    <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                      <h4 className="font-semibold text-green-800 mb-2 flex items-center gap-2">
                        <CheckCircle className="w-4 h-4" />
                        Acceptance Criteria:
                      </h4>
                      <p className="text-green-700 font-medium">{test.criteria}</p>
                    </div>

                    <div className="grid grid-cols-1 gap-3">
                      <div className="bg-blue-50 p-3 rounded-lg">
                        <h5 className="font-semibold text-blue-800 text-sm mb-1">Analytical Method:</h5>
                        <p className="text-blue-700 text-sm">{test.method}</p>
                      </div>

                      <div className="bg-purple-50 p-3 rounded-lg">
                        <h5 className="font-semibold text-purple-800 text-sm mb-1">Testing Frequency:</h5>
                        <p className="text-purple-700 text-sm">{test.frequency}</p>
                      </div>

                      <div className="bg-orange-50 p-3 rounded-lg">
                        <h5 className="font-semibold text-orange-800 text-sm mb-1">Regulatory References:</h5>
                        <p className="text-orange-700 text-sm">{test.regulatory}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="bg-gradient-to-r from-indigo-50 to-blue-50 border-indigo-200 mt-8">
              <CardContent className="p-6">
                <div className="text-center">
                  <h3 className="text-xl font-bold text-indigo-900 mb-3">Quality Control Excellence</h3>
                  <p className="text-indigo-700 leading-relaxed max-w-3xl mx-auto">
                    Our pharmaceutical quality control laboratory maintains the highest standards of analytical testing,
                    ensuring every product meets stringent safety and efficacy requirements. All methods are validated
                    according to ICH Q2(R1) guidelines and regularly verified for continued performance.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
