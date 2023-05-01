import Navigator from './navigator'

export default function Layout({ children }) {
    return (
        <div className="flex flex-col md:flex-row">
            {/* navigator */}
            <div className="navigator mx-auto text-center pt-5 md:pt-20 md:pr-20 md:pl-20
                md:h-screen md:sticky md:top-0">
                <Navigator/>
            </div>

            {/* content */}
            <div className="content w-screen p-5 md:p-20 pt-0 md:pt-10">
                {children}
            </div>
        </div>
    )
  }