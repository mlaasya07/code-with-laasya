import { useState } from "react";
import { Database, Play, RotateCcw, Undo2, Redo2, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const RYQ = () => {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState("");
  const [queryHistory, setQueryHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  // Sample database schemas
  const databases = [
    {
      name: "ecom_db",
      description: "E-commerce platform database",
      tables: [
        {
          name: "users",
          description: "Customer information",
          columns: ["user_id", "name", "email", "country", "created_at"],
          sampleData: [
            { user_id: 1, name: "Alice", email: "alice@example.com", country: "USA", created_at: "2024-01-15" },
            { user_id: 2, name: "Bob", email: "bob@example.com", country: "UK", created_at: "2024-02-20" },
            { user_id: 3, name: "Charlie", email: "charlie@example.com", country: "Canada", created_at: "2024-03-10" },
            { user_id: 4, name: "Diana", email: "diana@example.com", country: "Australia", created_at: "2024-04-05" },
            { user_id: 5, name: "Ethan", email: "ethan@example.com", country: "USA", created_at: "2024-05-12" },
            { user_id: 6, name: "Fiona", email: "fiona@example.com", country: "Germany", created_at: "2024-06-08" },
            { user_id: 7, name: "George", email: "george@example.com", country: "France", created_at: "2024-07-22" },
            { user_id: 8, name: "Hannah", email: "hannah@example.com", country: "Japan", created_at: "2024-08-14" },
            { user_id: 9, name: "Isaac", email: "isaac@example.com", country: "Brazil", created_at: "2024-09-03" },
            { user_id: 10, name: "Julia", email: "julia@example.com", country: "India", created_at: "2024-10-19" },
            { user_id: 11, name: "Kevin", email: "kevin@example.com", country: "USA", created_at: "2024-11-05" },
            { user_id: 12, name: "Laura", email: "laura@example.com", country: "Spain", created_at: "2024-11-12" },
            { user_id: 13, name: "Mike", email: "mike@example.com", country: "Italy", created_at: "2024-11-18" },
            { user_id: 14, name: "Nina", email: "nina@example.com", country: "UK", created_at: "2024-11-25" },
            { user_id: 15, name: "Oscar", email: "oscar@example.com", country: "Mexico", created_at: "2024-12-01" },
            { user_id: 16, name: "Paula", email: "paula@example.com", country: "USA", created_at: "2024-12-08" },
            { user_id: 17, name: "Quinn", email: "quinn@example.com", country: "Canada", created_at: "2024-12-15" },
            { user_id: 18, name: "Rachel", email: "rachel@example.com", country: "Australia", created_at: "2024-12-20" },
            { user_id: 19, name: "Steve", email: "steve@example.com", country: "Germany", created_at: "2024-12-28" },
            { user_id: 20, name: "Tina", email: "tina@example.com", country: "France", created_at: "2025-01-05" },
          ],
        },
        {
          name: "orders",
          description: "Order transactions",
          columns: ["order_id", "user_id", "product", "amount", "order_date"],
          sampleData: [
            { order_id: 101, user_id: 1, product: "Laptop", amount: 1200, order_date: "2024-06-01" },
            { order_id: 102, user_id: 2, product: "Phone", amount: 800, order_date: "2024-06-15" },
            { order_id: 103, user_id: 1, product: "Tablet", amount: 400, order_date: "2024-07-01" },
            { order_id: 104, user_id: 3, product: "Headphones", amount: 150, order_date: "2024-07-10" },
            { order_id: 105, user_id: 4, product: "Laptop", amount: 1200, order_date: "2024-07-22" },
            { order_id: 106, user_id: 5, product: "Keyboard", amount: 100, order_date: "2024-08-05" },
            { order_id: 107, user_id: 2, product: "Mouse", amount: 50, order_date: "2024-08-18" },
            { order_id: 108, user_id: 6, product: "Monitor", amount: 350, order_date: "2024-09-02" },
            { order_id: 109, user_id: 7, product: "Tablet", amount: 400, order_date: "2024-09-15" },
            { order_id: 110, user_id: 8, product: "Phone", amount: 800, order_date: "2024-10-01" },
            { order_id: 111, user_id: 1, product: "Headphones", amount: 150, order_date: "2024-10-10" },
            { order_id: 112, user_id: 9, product: "Keyboard", amount: 100, order_date: "2024-10-25" },
            { order_id: 113, user_id: 10, product: "Monitor", amount: 350, order_date: "2024-11-02" },
            { order_id: 114, user_id: 11, product: "Laptop", amount: 1200, order_date: "2024-11-08" },
            { order_id: 115, user_id: 3, product: "Mouse", amount: 50, order_date: "2024-11-15" },
            { order_id: 116, user_id: 12, product: "Tablet", amount: 400, order_date: "2024-11-22" },
            { order_id: 117, user_id: 13, product: "Phone", amount: 800, order_date: "2024-11-28" },
            { order_id: 118, user_id: 4, product: "Webcam", amount: 80, order_date: "2024-12-03" },
            { order_id: 119, user_id: 14, product: "Speakers", amount: 120, order_date: "2024-12-10" },
            { order_id: 120, user_id: 15, product: "Router", amount: 200, order_date: "2024-12-15" },
          ],
        },
        {
          name: "products",
          description: "Product catalog",
          columns: ["product_id", "name", "category", "price", "stock"],
          sampleData: [
            { product_id: 1, name: "Laptop", category: "Electronics", price: 1200, stock: 50 },
            { product_id: 2, name: "Phone", category: "Electronics", price: 800, stock: 100 },
            { product_id: 3, name: "Tablet", category: "Electronics", price: 400, stock: 75 },
            { product_id: 4, name: "Headphones", category: "Accessories", price: 150, stock: 200 },
            { product_id: 5, name: "Keyboard", category: "Accessories", price: 100, stock: 150 },
            { product_id: 6, name: "Mouse", category: "Accessories", price: 50, stock: 300 },
            { product_id: 7, name: "Monitor", category: "Electronics", price: 350, stock: 60 },
            { product_id: 8, name: "Webcam", category: "Accessories", price: 80, stock: 120 },
            { product_id: 9, name: "Speakers", category: "Accessories", price: 120, stock: 90 },
            { product_id: 10, name: "Router", category: "Electronics", price: 200, stock: 45 },
          ],
        },
      ],
    },
    {
      name: "library_db",
      description: "Library management system",
      tables: [
        {
          name: "books",
          description: "Book catalog",
          columns: ["book_id", "title", "author", "genre", "published_year", "available"],
          sampleData: [
            { book_id: 1, title: "The Great Gatsby", author: "F. Scott Fitzgerald", genre: "Fiction", published_year: 1925, available: true },
            { book_id: 2, title: "1984", author: "George Orwell", genre: "Dystopian", published_year: 1949, available: false },
            { book_id: 3, title: "To Kill a Mockingbird", author: "Harper Lee", genre: "Fiction", published_year: 1960, available: true },
            { book_id: 4, title: "Pride and Prejudice", author: "Jane Austen", genre: "Romance", published_year: 1813, available: true },
            { book_id: 5, title: "The Catcher in the Rye", author: "J.D. Salinger", genre: "Fiction", published_year: 1951, available: false },
            { book_id: 6, title: "Brave New World", author: "Aldous Huxley", genre: "Dystopian", published_year: 1932, available: true },
            { book_id: 7, title: "The Hobbit", author: "J.R.R. Tolkien", genre: "Fantasy", published_year: 1937, available: true },
            { book_id: 8, title: "Harry Potter", author: "J.K. Rowling", genre: "Fantasy", published_year: 1997, available: false },
            { book_id: 9, title: "Moby Dick", author: "Herman Melville", genre: "Adventure", published_year: 1851, available: true },
            { book_id: 10, title: "War and Peace", author: "Leo Tolstoy", genre: "Historical", published_year: 1869, available: true },
            { book_id: 11, title: "The Lord of the Rings", author: "J.R.R. Tolkien", genre: "Fantasy", published_year: 1954, available: true },
            { book_id: 12, title: "Jane Eyre", author: "Charlotte Bronte", genre: "Romance", published_year: 1847, available: false },
            { book_id: 13, title: "Animal Farm", author: "George Orwell", genre: "Dystopian", published_year: 1945, available: true },
            { book_id: 14, title: "The Odyssey", author: "Homer", genre: "Adventure", published_year: -800, available: true },
            { book_id: 15, title: "Frankenstein", author: "Mary Shelley", genre: "Horror", published_year: 1818, available: false },
            { book_id: 16, title: "Dracula", author: "Bram Stoker", genre: "Horror", published_year: 1897, available: true },
            { book_id: 17, title: "Wuthering Heights", author: "Emily Bronte", genre: "Romance", published_year: 1847, available: true },
            { book_id: 18, title: "The Divine Comedy", author: "Dante Alighieri", genre: "Poetry", published_year: 1320, available: true },
            { book_id: 19, title: "Don Quixote", author: "Miguel de Cervantes", genre: "Adventure", published_year: 1605, available: false },
            { book_id: 20, title: "The Iliad", author: "Homer", genre: "Adventure", published_year: -750, available: true },
          ],
        },
        {
          name: "members",
          description: "Library members",
          columns: ["member_id", "name", "email", "join_date", "membership_type"],
          sampleData: [
            { member_id: 1, name: "Emma Watson", email: "emma@library.com", join_date: "2023-01-10", membership_type: "Premium" },
            { member_id: 2, name: "John Doe", email: "john@library.com", join_date: "2023-05-20", membership_type: "Basic" },
            { member_id: 3, name: "Sarah Connor", email: "sarah@library.com", join_date: "2023-08-15", membership_type: "Premium" },
            { member_id: 4, name: "Michael Scott", email: "michael@library.com", join_date: "2023-09-01", membership_type: "Basic" },
            { member_id: 5, name: "Olivia Brown", email: "olivia@library.com", join_date: "2023-10-12", membership_type: "Premium" },
            { member_id: 6, name: "William Turner", email: "will@library.com", join_date: "2024-01-05", membership_type: "Basic" },
            { member_id: 7, name: "Sophia Martinez", email: "sophia@library.com", join_date: "2024-02-14", membership_type: "Premium" },
            { member_id: 8, name: "James Bond", email: "james@library.com", join_date: "2024-03-22", membership_type: "Premium" },
            { member_id: 9, name: "Isabella Chen", email: "isabella@library.com", join_date: "2024-05-30", membership_type: "Basic" },
            { member_id: 10, name: "Daniel Kim", email: "daniel@library.com", join_date: "2024-07-18", membership_type: "Basic" },
            { member_id: 11, name: "Robert Miller", email: "robert@library.com", join_date: "2024-08-10", membership_type: "Premium" },
            { member_id: 12, name: "Jessica White", email: "jessica@library.com", join_date: "2024-09-05", membership_type: "Basic" },
            { member_id: 13, name: "David Clark", email: "david@library.com", join_date: "2024-09-20", membership_type: "Premium" },
            { member_id: 14, name: "Amanda Lewis", email: "amanda@library.com", join_date: "2024-10-01", membership_type: "Basic" },
            { member_id: 15, name: "Christopher Hall", email: "chris@library.com", join_date: "2024-10-15", membership_type: "Premium" },
          ],
        },
        {
          name: "loans",
          description: "Book loan records",
          columns: ["loan_id", "member_id", "book_id", "loan_date", "return_date"],
          sampleData: [
            { loan_id: 1, member_id: 1, book_id: 1, loan_date: "2024-10-01", return_date: "2024-10-15" },
            { loan_id: 2, member_id: 2, book_id: 2, loan_date: "2024-10-05", return_date: null },
            { loan_id: 3, member_id: 3, book_id: 3, loan_date: "2024-10-10", return_date: "2024-10-20" },
            { loan_id: 4, member_id: 4, book_id: 4, loan_date: "2024-09-15", return_date: "2024-09-29" },
            { loan_id: 5, member_id: 5, book_id: 5, loan_date: "2024-10-12", return_date: null },
            { loan_id: 6, member_id: 6, book_id: 6, loan_date: "2024-09-20", return_date: "2024-10-04" },
            { loan_id: 7, member_id: 7, book_id: 7, loan_date: "2024-10-08", return_date: "2024-10-22" },
            { loan_id: 8, member_id: 8, book_id: 8, loan_date: "2024-10-14", return_date: null },
            { loan_id: 9, member_id: 1, book_id: 9, loan_date: "2024-09-25", return_date: "2024-10-09" },
            { loan_id: 10, member_id: 9, book_id: 10, loan_date: "2024-10-11", return_date: "2024-10-25" },
            { loan_id: 11, member_id: 10, book_id: 1, loan_date: "2024-10-18", return_date: null },
            { loan_id: 12, member_id: 11, book_id: 11, loan_date: "2024-10-20", return_date: "2024-11-03" },
            { loan_id: 13, member_id: 12, book_id: 12, loan_date: "2024-10-22", return_date: null },
            { loan_id: 14, member_id: 3, book_id: 13, loan_date: "2024-10-25", return_date: "2024-11-08" },
            { loan_id: 15, member_id: 13, book_id: 14, loan_date: "2024-11-01", return_date: "2024-11-15" },
            { loan_id: 16, member_id: 14, book_id: 15, loan_date: "2024-11-05", return_date: null },
            { loan_id: 17, member_id: 5, book_id: 16, loan_date: "2024-11-08", return_date: "2024-11-22" },
            { loan_id: 18, member_id: 15, book_id: 17, loan_date: "2024-11-10", return_date: null },
          ],
        },
      ],
    },
    {
      name: "school_db",
      description: "School management system",
      tables: [
        {
          name: "students",
          description: "Student records",
          columns: ["student_id", "name", "grade", "age", "enrollment_date"],
          sampleData: [
            { student_id: 1, name: "Alex Johnson", grade: "10th", age: 15, enrollment_date: "2022-09-01" },
            { student_id: 2, name: "Maria Garcia", grade: "11th", age: 16, enrollment_date: "2021-09-01" },
            { student_id: 3, name: "Kevin Lee", grade: "10th", age: 15, enrollment_date: "2022-09-01" },
            { student_id: 4, name: "Emma Wilson", grade: "12th", age: 17, enrollment_date: "2020-09-01" },
            { student_id: 5, name: "Ryan Patel", grade: "9th", age: 14, enrollment_date: "2023-09-01" },
            { student_id: 6, name: "Sophie Taylor", grade: "11th", age: 16, enrollment_date: "2021-09-01" },
            { student_id: 7, name: "Nathan Brown", grade: "10th", age: 15, enrollment_date: "2022-09-01" },
            { student_id: 8, name: "Lily Anderson", grade: "12th", age: 17, enrollment_date: "2020-09-01" },
            { student_id: 9, name: "Marcus Davis", grade: "9th", age: 14, enrollment_date: "2023-09-01" },
            { student_id: 10, name: "Zoe Martinez", grade: "11th", age: 16, enrollment_date: "2021-09-01" },
            { student_id: 11, name: "Tyler Moore", grade: "9th", age: 14, enrollment_date: "2023-09-01" },
            { student_id: 12, name: "Grace Chen", grade: "10th", age: 15, enrollment_date: "2022-09-01" },
            { student_id: 13, name: "Brandon White", grade: "12th", age: 17, enrollment_date: "2020-09-01" },
            { student_id: 14, name: "Ashley Thomas", grade: "11th", age: 16, enrollment_date: "2021-09-01" },
            { student_id: 15, name: "Jordan Hill", grade: "9th", age: 14, enrollment_date: "2023-09-01" },
          ],
        },
        {
          name: "courses",
          description: "Available courses",
          columns: ["course_id", "course_name", "teacher", "credits", "semester"],
          sampleData: [
            { course_id: 1, course_name: "Mathematics", teacher: "Dr. Smith", credits: 4, semester: "Fall" },
            { course_id: 2, course_name: "Physics", teacher: "Dr. Brown", credits: 4, semester: "Fall" },
            { course_id: 3, course_name: "English Literature", teacher: "Ms. Davis", credits: 3, semester: "Spring" },
            { course_id: 4, course_name: "Chemistry", teacher: "Dr. Johnson", credits: 4, semester: "Fall" },
            { course_id: 5, course_name: "History", teacher: "Mr. Williams", credits: 3, semester: "Spring" },
            { course_id: 6, course_name: "Computer Science", teacher: "Ms. Anderson", credits: 4, semester: "Fall" },
            { course_id: 7, course_name: "Biology", teacher: "Dr. Lee", credits: 4, semester: "Spring" },
            { course_id: 8, course_name: "Art", teacher: "Ms. Taylor", credits: 2, semester: "Fall" },
            { course_id: 9, course_name: "Physical Education", teacher: "Coach Wilson", credits: 2, semester: "Spring" },
            { course_id: 10, course_name: "Spanish", teacher: "Señora Rodriguez", credits: 3, semester: "Fall" },
          ],
        },
        {
          name: "enrollments",
          description: "Student course enrollments",
          columns: ["enrollment_id", "student_id", "course_id", "grade"],
          sampleData: [
            { enrollment_id: 1, student_id: 1, course_id: 1, grade: "A" },
            { enrollment_id: 2, student_id: 2, course_id: 2, grade: "B+" },
            { enrollment_id: 3, student_id: 3, course_id: 1, grade: "A-" },
            { enrollment_id: 4, student_id: 4, course_id: 3, grade: "A+" },
            { enrollment_id: 5, student_id: 5, course_id: 6, grade: "B" },
            { enrollment_id: 6, student_id: 6, course_id: 4, grade: "A-" },
            { enrollment_id: 7, student_id: 1, course_id: 6, grade: "B+" },
            { enrollment_id: 8, student_id: 7, course_id: 2, grade: "C+" },
            { enrollment_id: 9, student_id: 8, course_id: 7, grade: "A" },
            { enrollment_id: 10, student_id: 2, course_id: 5, grade: "A-" },
            { enrollment_id: 11, student_id: 9, course_id: 1, grade: "B-" },
            { enrollment_id: 12, student_id: 10, course_id: 10, grade: "A" },
            { enrollment_id: 13, student_id: 11, course_id: 6, grade: "B+" },
            { enrollment_id: 14, student_id: 12, course_id: 8, grade: "A" },
            { enrollment_id: 15, student_id: 13, course_id: 3, grade: "A-" },
            { enrollment_id: 16, student_id: 3, course_id: 4, grade: "B" },
            { enrollment_id: 17, student_id: 14, course_id: 5, grade: "A+" },
            { enrollment_id: 18, student_id: 15, course_id: 9, grade: "B+" },
          ],
        },
      ],
    },
  ];

  const [selectedDB, setSelectedDB] = useState(0);
  const sampleDB = databases[selectedDB];

  const executeQuery = () => {
    if (!query.trim()) {
      setError("Please enter a SQL query");
      return;
    }

    setError("");
    setQueryHistory([...queryHistory, query]);
    setHistoryIndex(queryHistory.length);

    // Simple query simulation with error checking
    const lowerQuery = query.toLowerCase().trim();
    
    // Check for basic SQL syntax
    if (!lowerQuery.startsWith("select")) {
      setError("Syntax Error: Query must start with SELECT statement");
      setResult(null);
      return;
    }

    if (!lowerQuery.includes("from")) {
      setError("Syntax Error: Missing FROM clause in query");
      setResult(null);
      return;
    }

    // Extract table name
    const fromMatch = lowerQuery.match(/from\s+(\w+)/);
    if (!fromMatch) {
      setError("Syntax Error: Invalid FROM clause");
      setResult(null);
      return;
    }

    const tableName = fromMatch[1];
    const tableMap: { [key: string]: any } = {
      users: sampleDB.tables[0]?.sampleData,
      orders: sampleDB.tables[1]?.sampleData,
      products: sampleDB.tables[2]?.sampleData,
      books: sampleDB.tables[0]?.sampleData,
      members: sampleDB.tables[1]?.sampleData,
      loans: sampleDB.tables[2]?.sampleData,
      students: sampleDB.tables[0]?.sampleData,
      courses: sampleDB.tables[1]?.sampleData,
      enrollments: sampleDB.tables[2]?.sampleData,
    };

    if (!tableMap[tableName]) {
      const availableTables = sampleDB.tables.map(t => t.name).join(", ");
      setError(`Query Error: Table '${tableName}' not found. Available tables: ${availableTables}`);
      setResult(null);
      return;
    }

    setResult(tableMap[tableName]);
  };

  const handleUndo = () => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1;
      setHistoryIndex(newIndex);
      setQuery(queryHistory[newIndex]);
    }
  };

  const handleRedo = () => {
    if (historyIndex < queryHistory.length - 1) {
      const newIndex = historyIndex + 1;
      setHistoryIndex(newIndex);
      setQuery(queryHistory[newIndex]);
    }
  };

  const handleReset = () => {
    setQuery("");
    setResult(null);
    setError("");
  };

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto space-y-6">
          {/* Header */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <Database className="w-8 h-8 text-primary" />
              <h1 className="text-4xl font-bold">RYQ - Run Your Query</h1>
            </div>
            <p className="text-lg text-muted-foreground">
              Practice SQL queries on sample datasets with instant feedback
            </p>
          </div>

          {/* Database Selector */}
          <div className="flex gap-2 flex-wrap">
            {databases.map((db, idx) => (
              <Button
                key={idx}
                variant={selectedDB === idx ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedDB(idx)}
              >
                {db.name}
              </Button>
            ))}
          </div>

          {/* Database Info */}
          <Card className="bg-card/50 border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl">
                <Info className="w-5 h-5 text-primary" />
                Database: {sampleDB.name}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible>
                {sampleDB.tables.map((table, idx) => (
                  <AccordionItem key={idx} value={`table-${idx}`}>
                    <AccordionTrigger className="text-foreground hover:text-primary">
                      {table.name} - {table.description}
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-3">
                        <div>
                          <p className="text-sm text-muted-foreground mb-2">
                            <strong>Columns:</strong> {table.columns.join(", ")}
                          </p>
                        </div>
                        <div className="overflow-x-auto">
                          <table className="w-full text-sm">
                            <thead>
                              <tr className="border-b border-border">
                                {table.columns.map((col) => (
                                  <th key={col} className="text-left py-2 px-3 text-muted-foreground">
                                    {col}
                                  </th>
                                ))}
                              </tr>
                            </thead>
                            <tbody>
                              {table.sampleData.map((row: any, idx) => (
                                <tr key={idx} className="border-b border-border/50">
                                  {table.columns.map((col) => (
                                    <td key={col} className="py-2 px-3">
                                      {row[col]}
                                    </td>
                                  ))}
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>

          {/* Query Editor */}
          <Card className="bg-card/50 border-border">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>SQL Query Editor</CardTitle>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={handleUndo}
                    disabled={historyIndex <= 0}
                  >
                    <Undo2 className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={handleRedo}
                    disabled={historyIndex >= queryHistory.length - 1}
                  >
                    <Redo2 className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="outline" onClick={handleReset}>
                    <RotateCcw className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
                    e.preventDefault();
                    executeQuery();
                  }
                }}
                placeholder="Enter your SQL query here... (e.g., SELECT * FROM users) - Press Ctrl+Enter to execute"
                className="font-mono min-h-[150px] bg-background"
              />
              <Button onClick={executeQuery} className="gap-2">
                <Play className="w-4 h-4" />
                Execute Query
              </Button>
            </CardContent>
          </Card>

          {/* Results */}
          {error && (
            <Card className="bg-destructive/10 border-destructive">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div className="text-destructive font-bold text-lg">❌</div>
                  <div className="flex-1">
                    <p className="text-sm font-bold text-destructive mb-1">Error</p>
                    <p className="text-sm text-destructive font-mono">{error}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {result && (
            <Card className="bg-card/50 border-border">
              <CardHeader>
                <CardTitle>Query Results</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border">
                        {Object.keys(result[0] || {}).map((key) => (
                          <th key={key} className="text-left py-2 px-3 text-muted-foreground">
                            {key}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {result.map((row: any, idx: number) => (
                        <tr key={idx} className="border-b border-border/50">
                          {Object.values(row).map((val: any, i) => (
                            <td key={i} className="py-2 px-3">
                              {String(val)}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="text-sm text-muted-foreground mt-4">
                  {result.length} row(s) returned
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default RYQ;
