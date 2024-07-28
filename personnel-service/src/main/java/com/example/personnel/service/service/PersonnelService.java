package com.example.personnel.service.service;

import com.example.personnel.service.dtos.PersonnelDto;
import com.example.personnel.service.exceptions.AlreadyExistException;
import com.example.personnel.service.exceptions.NotFoundException;
import com.example.personnel.service.mappers.PersonnelMapper;
import com.example.personnel.service.models.Personnel;
import com.example.personnel.service.models.TypePersonnel;
import com.example.personnel.service.repository.PersonnelRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.personnel.service.dtos.CommandePersonnelDto;

import java.util.List;

@Service
public class PersonnelService {
    @Autowired
    private PersonnelRepository personnelRepository;
    @Autowired
    CommandeAPIClient commandeAPIClient;
    @Autowired
    PersonnelMapper personnelMapper;

    public Personnel savePersonnel(PersonnelDto personnel){
        if(personnelRepository.existsPersonnelByCodePersonnel(personnel.getCodePersonnel())){
            throw new AlreadyExistException(personnel.getCodePersonnel());
        }
        Personnel newPersonnel= personnelMapper.fromDto(personnel);
        return personnelRepository.save(newPersonnel);
    }
   public Personnel getPersonnel(Long personnelId){
        return personnelRepository.findById(personnelId).orElseThrow(() -> new NotFoundException(personnelId));
   }
   public List<Personnel> getEmployes(){
       return personnelRepository.findByTypePersonnel(TypePersonnel.EMPLOYE);
   }
    public List<Personnel> getPersonnelRestaurant(){
        return personnelRepository.findByTypePersonnel(TypePersonnel.PERSONNEL_RESTAURANT);
    }
    public List<CommandePersonnelDto>  getHistoriqueCommande(Long personnelId){
        if(!personnelRepository.existsById(personnelId)){
            throw new NotFoundException(personnelId);
        }
        return commandeAPIClient.getHistoriqueCommandeById(personnelId);
    }
    public String deletePersonnel (Long personnelId){
        if(!personnelRepository.existsById(personnelId)){
            throw new NotFoundException(personnelId);
        }
        personnelRepository.deleteById(personnelId);
        return "Personnel supprimé";
    }
    public Personnel updatePersonnel(Long id, PersonnelDto personnelDto){
        Personnel personnel=personnelRepository.findById(id).orElseThrow(()-> new NotFoundException(id));
        if(personnelRepository.existsPersonnelByCodePersonnel(personnelDto.getCodePersonnel()) && !personnelDto.getCodePersonnel().equalsIgnoreCase(personnel.getCodePersonnel())){
            throw new AlreadyExistException(personnelDto.getCodePersonnel());
        }
        personnelMapper.fromDto(personnelDto,personnel);
        return personnelRepository.save(personnel);
    }
}