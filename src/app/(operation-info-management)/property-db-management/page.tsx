"use client";

import React from 'react'
import { Button } from "@progress/kendo-react-buttons";
import { useState } from "react";
import { PropertyDbManagementTable } from "@/components/PropertyDbManagementTable";
import { PropertyDBManagementAddModal } from '@/components/modal/PropertyDBManagementAddModal';


export default function Page() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showModal,setShowModal] = React.useState(false);  // <10-2> Property DB management - Detail view



  const toggleExpansion = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <>
      <div className="flex items-center gap-2 py-4">
        <img src={"/images/dot_subtitle.gif"} alt="" style={{}} />
        <span className="text-[#656565] font-bold">List</span>
      </div>
      <div className="mb-4 flex justify-end">
        <Button imageUrl="/images/dot-right-arrow.png" className="basic-btn mt-2 flex h-7 items-center justify-start">
          Property file export
        </Button>
      </div>
      <PropertyDbManagementTable />
      <div className="flex justify-end">
        <Button
          imageUrl="/images/dot-right-arrow.png"
          className="basic-btn mt-2 flex h-7 items-center justify-start"
          onClick={() => {
            setShowModal(true);
          }}>
          Create new property group
        </Button>
      </div>
          {showModal && <PropertyDBManagementAddModal setShowModal={setShowModal} />}
    </>
  );
}

