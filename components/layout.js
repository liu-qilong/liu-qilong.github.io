import Navigator from './navigator'

export default function Layout({ children }) {
    return (
        <div class="flex flex-col md:flex-row">
            {/* navigator */}
            <div class="text-center pt-5 md:pt-20 md:pr-20 md:pl-20 border-b md:shadow-lg md:border-0
                md:basis-1/3 md:h-screen md:sticky md:top-0">
                <Navigator/>
            </div>

            {/* content */}
            <div class="w-screen md:basis-2/3 p-10 pt-0 md:pt-10">
                {children}
            </div>
        </div>
    )
  }