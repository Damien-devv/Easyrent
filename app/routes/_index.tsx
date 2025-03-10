import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "Real Estate Marketplace" },
    { name: "description", content: "Find your dream property with us" },
  ];
};

export default function Index() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Hero Section */}
      <div className="relative h-[600px] bg-[url('/hero.jpg')] bg-cover bg-center">
        <div className="absolute inset-0 bg-black/50">
          <div className="container mx-auto flex h-full flex-col justify-center px-4">
            <h1 className="text-5xl font-bold text-white">
              Find Your Dream Home
            </h1>
            <p className="mt-4 text-xl text-gray-200">
              Explore thousands of properties across the country
            </p>
            <div className="mt-8 max-w-md rounded-lg bg-white/90 p-6 shadow-lg dark:bg-gray-800/90">
              <form className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Location"
                  className="col-span-2 rounded-md border p-3"
                />
                <select className="rounded-md border p-3">
                  <option>Property Type</option>
                  <option>House</option>
                  <option>Apartment</option>
                  <option>Villa</option>
                </select>
                <select className="rounded-md border p-3">
                  <option>Price Range</option>
                  <option>$100k - $200k</option>
                  <option>$200k - $500k</option>
                  <option>$500k+</option>
                </select>
                <button
                  type="submit"
                  className="col-span-2 rounded-md bg-blue-600 px-6 py-3 text-white hover:bg-blue-700"
                >
                  Search Properties
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Properties */}
      <div className="container mx-auto py-16">
        <h2 className="mb-8 text-3xl font-bold">Featured Properties</h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {[1, 2, 3].map((property) => (
            <div key={property} className="rounded-lg shadow-lg">
              <div className="h-48 bg-gray-200"></div>
              <div className="p-6">
                <h3 className="text-xl font-semibold">Modern Apartment</h3>
                <p className="mt-2 text-gray-600">New York, NY</p>
                <p className="mt-4 text-2xl font-bold">$450,000</p>
                <div className="mt-4 flex items-center text-sm text-gray-600">
                  <span>3 Beds</span>
                  <span className="mx-2">•</span>
                  <span>2 Baths</span>
                  <span className="mx-2">•</span>
                  <span>1200 sqft</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Services Section */}
      <div className="bg-gray-100 py-16 dark:bg-gray-900">
        <div className="container mx-auto">
          <h2 className="mb-8 text-center text-3xl font-bold">Our Services</h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="rounded-lg bg-white p-8 shadow-lg dark:bg-gray-800">
              <h3 className="text-xl font-semibold">Buy a Home</h3>
              <p className="mt-4 text-gray-600">
                Find your perfect home with our extensive property listings
              </p>
            </div>
            <div className="rounded-lg bg-white p-8 shadow-lg dark:bg-gray-800">
              <h3 className="text-xl font-semibold">Sell a Property</h3>
              <p className="mt-4 text-gray-600">
                Get the best value for your property with our expert agents
              </p>
            </div>
            <div className="rounded-lg bg-white p-8 shadow-lg dark:bg-gray-800">
              <h3 className="text-xl font-semibold">Rent a Space</h3>
              <p className="mt-4 text-gray-600">
                Discover rental properties that fit your lifestyle
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
